const render = (file, element, notFound = '/pages/not_found/not_found.html') => {
  const rawFile = getFile(file);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        const allText = rawFile.responseText;
        document.getElementById(element).insertAdjacentHTML('beforeend', allText);
      } else {
        render(notFound, element);
      }
    }
  }
  rawFile.send(null);
}

const getFile = (file) => {
  const rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  return rawFile;
}

const resetHTML = () => {
  const toolbar = document.getElementById('toolbar');
  const content = document.getElementById('content');
  const footer = document.getElementById('footer');
  toolbar.style.display = 'none';
  footer.style.display = 'none';
  content.style.top = 0;
  content.style.left = 0;
  content.style.width = '100%';
  content.style.height = '100vh';
  content.style.backgroundColor = 'var(--secondary-color)'
}

window.addEventListener('load', () => {
  const token = localStorage.getItem('token');
  if (window.location.pathname === '/login') {
    resetHTML();
    render('/pages/login/login.html', 'content');
  }
  if (!token && window.location.pathname !== '/login') {
    window.location.replace('/login');
    return;
  }
  if (window.location.pathname !== '/login') {
    render('/components/layout/toolbar.html', 'toolbar', null);
    render('/components/layout/footer.html', 'footer', null);
    let path = window.location.pathname.replace('/', '');
    if (!path) {
      window.location.replace('/home');
      path = 'home';
    }
    if (path) {
      render(`/pages/${path}/${path}.html`, 'content');
    }
  }
});
