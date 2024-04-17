// src/csrf.js

export function getCookie(name) {
  const cookieValue = document.cookie
    .split(';')
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith(`${name}=`));

  return cookieValue ? cookieValue.split('=')[1] : null;
}



// src/csrf.js

export function setCookie(name, value, options = {}) {
    // Default options: path=/, expires in 1 day
    const defaultOptions = { path: '/', expires: 1 };
  
    // Merge default options with user-specified options
    const mergedOptions = { ...defaultOptions, ...options };
  
    // Build the cookie string
    let cookieString = `${name}=${value}; path=${mergedOptions.path}`;
  
    if (mergedOptions.expires) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + mergedOptions.expires);
      cookieString += `; expires=${expirationDate.toUTCString()}`;
    }
  
    // Set the cookie
    document.cookie = cookieString;
  }

  
export function removeCookie(name) {
  // Set expiration date to a past date
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}