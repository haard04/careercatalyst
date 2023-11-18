// src/csrf.js

export function getCookie(name) {
    const cookieString = `; ${document.cookie}`;
    const parts = cookieString.split(`; ${name}=`);
    
    if (parts.length === 2) {
      return parts.pop().split(';').shift().trim(); // Trim to remove leading/trailing spaces
    }
  
    return null; // Return null if the cookie is not found
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
  