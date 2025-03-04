window.fwSettings = {
    'widget_id': 150000001296
  };
  !function(){if("function"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}();
  
  document.addEventListener('DOMContentLoaded', () => {
    const helpDeskLink = document.getElementById('help-desk-link');
    if (helpDeskLink) {
      helpDeskLink.addEventListener('click', (event) => {
        event.preventDefault();
        if (typeof window.FreshworksWidget !== 'undefined') {
          window.FreshworksWidget('open');
        } else {
          console.error('FreshworksWidget is not defined');
        }
      });
    }
  });