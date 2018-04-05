import controlsPremade from './config';

const execute = (el, command, val) => {
  if (el) {
    el.classList.toggle('active');
  }
  document.execCommand(command, false, val ? val: null);
}

export const init = (settings) => {
  const controls = controlsPremade[settings.controls];
  const ctrElement = settings.ctrElement;
  const outElement = settings.outElement;

  outElement.contentEditable = true;
  outElement.classList.add('output-el');

  ctrElement.addEventListener('click', (e) => {
    outElement.focus();
  });


  outElement.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      event.preventDefault();
    }else if (event.key === 'Enter' && document.queryCommandValue('formatBlock') === 'blockquote') {
      document.querySelectorAll('[title="Quote"]')[0].classList.toggle('active');
      execute(null, 'formatBlock', '<div>');
    }
  });

  controls.forEach(control => {
    const button = document.createElement('button');
    button.innerHTML = control.icon;
    button.title = control.title;
    button.setAttribute('type', 'button');
    button.classList.add('ctrl-btn');

    if (control.state) {
      button.addEventListener('click', () => execute(button, control.comName));
    } else if (control.formatBlock) {
      button.addEventListener('click', () => execute(null, control.formatBlock, control.comName));
    } else {
      button.addEventListener('click', () => execute(null, control.comName, (control.extra)()));
    }

    ctrElement.append(button);
  });
}