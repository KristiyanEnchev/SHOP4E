export const emailValidator = (email) => {
  if (!email) {
    return 'Email is required';
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return 'Incorrect email format';
  }
  return true;
};

export const passwordValidator = (password) => {
  if (!password) {
    return 'Password is required';
  } else if (password.length < 6) {
    return 'Password must have a minimum 8 characters';
  }
  return true;
};

export const nameValidator = (name) => {
  if (!name) {
    return 'Name is required';
  } else if (name.length < 3) {
    return 'Name must have a minimum 3 characters';
  }
  return '';
};

export const confirmPasswordValidator = (confirmPassword, password) => {
  if (!confirmPassword) {
    return 'Confirm password is required';
  } else if (confirmPassword.length < 6) {
    return 'Confirm password must have a minimum 8 characters';
  } else if (confirmPassword !== password) {
    return 'Passwords do not match';
  }
  return '';
};

export const firstNameValidator = (firstName) => {
  if (!firstName) {
    return 'firstName is required';
  } else if (firstName.length < 3) {
    return 'Incorrect firstName format, must be more than 3';
  }
  return true;
};

export const lastNameValidator = (lastName) => {
  if (!lastName) {
    return 'lastName is required';
  } else if (lastName.length < 3) {
    return 'Incorrect lastName format, must be more than 3';
  }
  return true;
};

export const avatarValidator = (avatar) => {
  if (!avatar) {
    return 'avatar is required';
  }
  return true;
};

export const productImageValidator = (avatar) => {
  if (!avatar) {
    return 'Product Image is required';
  }
  return '';
};

export const productNameValidator = (name) => {
  if (!name) {
    return 'Product name is required';
  } else if (name.length < 3) {
    return 'Incorrect Product name format, must be more than 3';
  }
  return '';
};

export const priceValidator = (price) => {
  if (!price) {
    return 'Product price is required';
  } else if (Number(price) < 0) {
    return 'Incorrect Price should be positive';
  }
  return '';
};

export const productSlugValidator = (slug) => {
  if (!slug) {
    return 'Product slug is required';
  } else if (slug.length < 3) {
    return 'Incorrect Product slug format, must be more than 3';
  }
  return '';
};

export const productCategoryValidator = (category) => {
  if (!category) {
    return 'Product slug is required';
  } else if (category.length < 3) {
    return 'Incorrect Product category format, must be more than 3';
  }
  return '';
};

export const countInStockValidator = (count) => {
  if (!count) {
    return 'Product count in stock is required';
  } else if (Number(count) < 0) {
    return 'Incorrect Count in stock should be positive';
  }
  return '';
};

export const descriptionValidator = (description) => {
  if (!description) {
    return 'Product description is required';
  } else if (description.length < 20) {
    return 'Incorrect Product description format, must be more than 20';
  }
  return '';
};
