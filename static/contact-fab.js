(function () {
  function createContactWidget() {
    if (document.getElementById('gedac-contact-widget')) return;

    var btn = document.createElement('a');
    btn.id = 'gedac-contact-widget';
    btn.href = '/contact';
    btn.setAttribute('aria-label', 'Contact us');
    btn.setAttribute('title', 'Contact us');

    var style = document.createElement('style');
    style.textContent = [
      '#gedac-contact-widget {',
      '  position: fixed;',
      '  bottom: 24px;',
      '  right: 24px;',
      '  width: 56px;',
      '  height: 56px;',
      '  border-radius: 50%;',
      '  background-color: #1f73b7;',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '  box-shadow: 0 4px 12px rgba(0,0,0,0.25);',
      '  z-index: 9999;',
      '  text-decoration: none;',
      '  transition: background-color 0.2s, transform 0.2s;',
      '}',
      '#gedac-contact-widget:hover {',
      '  background-color: #1557a0;',
      '  transform: scale(1.08);',
      '}',
      '#gedac-contact-widget svg {',
      '  width: 26px;',
      '  height: 26px;',
      '  fill: #ffffff;',
      '}',
    ].join('\n');
    document.head.appendChild(style);

    // Mail / envelope icon
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>';

    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createContactWidget);
  } else {
    createContactWidget();
  }

  // Re-attach after Docusaurus client-side navigation
  var _pushState = history.pushState;
  history.pushState = function () {
    _pushState.apply(history, arguments);
    createContactWidget();
  };
})();
