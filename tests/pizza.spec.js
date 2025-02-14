import { test, expect } from 'playwright-test-coverage';

test('home page', async ({ page }) => {
  await page.goto('/');

  expect(await page.title()).toBe('JWT Pizza');
});

test('checking title of page', async ({page}) => {await page.goto('http://localhost:5173/');
await expect(page.getByText('The web\'s best pizza', { exact: true })).toBeVisible();
await expect(page.getByText('The web\'s best pizza', { exact: true })).toBeVisible();
});

test('purchase with login', async ({ page }) => {
  await page.route('*/**/api/order/menu', async (route) => {
    const menuRes = [
      { id: 1, title: 'Veggie', image: 'pizza1.png', price: 0.0038, description: 'A garden of delight' },
      { id: 2, title: 'Pepperoni', image: 'pizza2.png', price: 0.0042, description: 'Spicy treat' },
    ];
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: menuRes });
  });


  await page.route('*/**/api/franchise', async (route) => {
    const franchiseRes = [
      {
        id: 2,
        name: 'LotaPizza',
        stores: [
          { id: 4, name: 'Lehi' },
          { id: 5, name: 'Springville' },
          { id: 6, name: 'American Fork' },
        ],
      },
      { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
      { id: 4, name: 'topSpot', stores: [] },
    ];
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: franchiseRes });
  });

  await page.route('*/**/api/auth', async (route) => {
    const loginReq = { email: 'd@jwt.com', password: 'a' };
    const loginRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'admin' }] }, token: 'abcdef' };
    expect(route.request().method()).toBe('PUT');
    expect(route.request().postDataJSON()).toMatchObject(loginReq);
    await route.fulfill({ json: loginRes });
  });

  await page.route('*/**/api/order', async (route) => {
    const orderReq = {
      items: [
        { menuId: 1, description: 'Veggie', price: 0.0038 },
        { menuId: 2, description: 'Pepperoni', price: 0.0042 },
      ],
      storeId: '4',
      franchiseId: 2,
    };
    const orderRes = {
      order: {
        items: [
          { menuId: 1, description: 'Veggie', price: 0.0038 },
          { menuId: 2, description: 'Pepperoni', price: 0.0042 },
        ],
        storeId: '4',
        franchiseId: 2,
        id: 23,
      },
      jwt: 'eyJpYXQ',
    };
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(orderReq);
    await route.fulfill({ json: orderRes });
  });

  // await page.route('*/**/api/franchise', async (route) => {
  //   const newFranchiseReq = {name: "pizza5", admins: [{email: "d@jwt.com"}]}; //{ name: "Nampa", admins: [{email: "d@jwt.com"}]};
  //   const newFranchiseRes = { name: 'pizza5', admins: [{ email: 'd@jwt.com', id: 4, name: 'pizza franchisee' }], id: 1 };
  //   console.log(route.request().method());
  //   expect(route.request().method()).toBe('POST');
  //   expect(route.request().postDataJSON()).toMatchObject(newFranchiseReq);
  //   await route.fulfill({ json: newFranchiseRes });
  // });

  await page.goto('/');

  // Go to order page
  await page.getByRole('button', { name: 'Order now' }).click();

  // Create order
  await expect(page.locator('h2')).toContainText('Awesome is a click away');
  await page.getByRole('combobox').selectOption('4');
  await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
  await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
  await expect(page.locator('form')).toContainText('Selected pizzas: 2');
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Login
  await page.getByPlaceholder('Email address').click();
  await page.getByPlaceholder('Email address').fill('d@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('a');
  await page.getByRole('button', { name: 'Login' }).click();

  // Pay
  await expect(page.getByRole('main')).toContainText('Send me those 2 pizzas right now!');
  await expect(page.locator('tbody')).toContainText('Veggie');
  await expect(page.locator('tbody')).toContainText('Pepperoni');
  await expect(page.locator('tfoot')).toContainText('0.008 ₿');
  await page.getByRole('button', { name: 'Pay now' }).click();

  // Check balance
  await expect(page.getByText('0.008')).toBeVisible();


  // await page.getByRole('link', { name: 'Admin' }).click(); 
  // await expect(page.locator('h2')).toContainText('Mama Ricci\'s kitchen'); 
  // await page.getByRole('button', { name: 'Add Franchise'}).click();


  // await page.getByPlaceholder('franchise name').click();
  // await page.getByPlaceholder('franchise name').fill('pizza5');
  // await page.getByPlaceholder('franchise name').press('Tab');
  // await page.getByPlaceholder('franchisee admin email').fill('d@jwt.com');
  // await page.getByRole('button', { name: 'Create' }).click(); 
});

test('test main pages of website', async ({ page }) => {await page.goto('http://localhost:5173/');
  await page.getByRole('contentinfo').getByRole('link', { name: 'Franchise' }).click();
  await page.getByRole('link', { name: 'About' }).click();
  await page.getByRole('link', { name: 'History' }).click();
  await page.getByText('JWT Pizza', { exact: true }).click();
  await page.getByRole('navigation', { name: 'Global' }).getByRole('img').click();
  await page.getByRole('link', { name: 'home' }).click();
});

test('register look at profile and logout', async ({ page }) => {
  await page.route('*/**/api/auth', async (route) => {
    const registerReq = {name: 'Tim', email: 't@jwt.com', password: 'a' };
    const registerRes = { user: { id: 3, name: 'Tim', email: 't@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(registerReq);
    await route.fulfill({ json: registerRes });
  });


  await page.goto('/');
  await page.getByRole('link', { name: 'Register' }).click();
  
  //register
  await expect(page.locator('h2')).toContainText('Welcome to the party');
  await page.getByPlaceholder('Full name').click()
  await page.getByPlaceholder('Full name').fill('Tim')
  await page.getByPlaceholder('Full name').press('Tab'); 
  await page.getByPlaceholder('Email address').fill('t@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('a');
  await page.getByRole('button', { name: 'Register' }).click();

  await page.getByRole('link', { name: 'T', exact: true}).click();
  await expect(page.locator('h2')).toContainText('Your pizza kitchen');
  await expect(page.locator('body')).toContainText('Tim');
  await expect(page.locator('body')).toContainText('t@jwt.com');
  await expect(page.locator('body')).toContainText('How have you lived this long without having a pizza?');

  await page.route('*/**/api/auth', async(route) => {
    const logoutRes = { message: 'logout successful'}
    expect(route.request().method()).toBe('DELETE')
    await route.fulfill({ json: logoutRes});
  });

  await page.getByRole('link', {name: 'Logout'}).click()
  await expect(page.locator('h2')).toContainText('The web\'s best pizza');
});

// 

test('look at admin page, create and delete franchise', async ({ page }) => {
  await page.route('*/**/api/auth', async (route) => {
    const loginReq = { email: 'e@jwt.com', password: 'a' };
    const loginRes = { user: { id: 3, name: 'name', email: 'e@jwt.com', roles: [{ role: 'admin' }] }, token: 'ab' };
    expect(route.request().method()).toBe('PUT');
    expect(route.request().postDataJSON()).toMatchObject(loginReq);
    await route.fulfill({ json: loginRes });
  });

  await page.route('*/**/api/franchise', async (route) => {
    const franchiseRes = [
      {
        id: 2,
        name: 'LotaPizza',
        stores: [
          { id: 4, name: 'Lehi' },
          { id: 5, name: 'Springville' },
          { id: 6, name: 'American Fork' },
        ],
      },
      { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
      { id: 4, name: 'topSpot', stores: [] },
    ];
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: franchiseRes });
  });

  // await page.route('*/**/api/franchise', async (route) => {
  //   const newFranchiseReq = {name: "pizza5", admins: [{email: "e@jwt.com"}]}; //{ name: "Nampa", admins: [{email: "d@jwt.com"}]};
  //   const newFranchiseRes = { name: 'pizza5', admins: [{ email: 'e@jwt.com', id: 4, name: 'pizza franchisee' }], id: 1 };
  //   expect(route.request().method()).toBe('POST');
  //   expect(route.request().postDataJSON()).toMatchObject(newFranchiseReq);
  //   await route.fulfill({ json: newFranchiseRes });
  // });

  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  // //login admin
  await page.getByPlaceholder('Email address').click();
  await page.getByPlaceholder('Email address').fill('e@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('a');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'n', exact: true}).click(); 
  await expect(page.locator('body')).toContainText('admin');
  await page.getByRole('link', { name: 'Admin' }).click();
  // await page.getByRole('link', { name: 'Franchise' }).click(); 
  //await page.getByRole('button', { name: 'Admin'}).click();
  //go to admin page and create franchise
  
  await page.getByRole('button', {name: 'Add Franchise'}).click();


  await page.route('*/**/api/franchise', async (route) => {
    const newFranchiseReq = {name: "pizza5", admins: [{email: "e@jwt.com"}]}; //{ name: "Nampa", admins: [{email: "d@jwt.com"}]};
    const newFranchiseRes = { name: 'pizza5', admins: [{ email: 'e@jwt.com', id: 4, name: 'pizza franchisee' }], id: 1 };
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(newFranchiseReq);
    await route.fulfill({ json: newFranchiseRes });
  });

  await page.getByPlaceholder('franchise name').click();
  await page.getByPlaceholder('franchise name').fill('pizza5');
  await page.getByPlaceholder('franchise name').press('Tab');
  await page.getByPlaceholder('franchisee admin email').fill('e@jwt.com');
  await page.getByRole('button', {name: 'Create'}).click();

  
  await page.route('*/**/api/franchise', async (route) => {
    const franchiseRes = [
      {
        id: 2,
        name: 'LotaPizza',
        stores: [
          { id: 4, name: 'Lehi' },
          { id: 5, name: 'Springville' },
          { id: 6, name: 'American Fork' },
        ],
      },
      { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
      { id: 4, name: 'topSpot', stores: [] },
      { id: 5, name: 'pizza5', stores: []}
    ];
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: franchiseRes });
  });

  await page.route(`*/**/api/franchise/${3}`, async (route) => {
    const userFranchiseRes = [{id: 5, name: "pizza5", admins: [{id: 3, name: "name", email: "e@jwt.com"}], stores: []}];
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: userFranchiseRes });
  });


  await page.getByRole('contentinfo').getByRole('link', { name: 'Franchise' }).click();
  await page.getByRole('button', {name: "Create store"}).click();

  await page.route(`*/**/api/franchise/${3}`, async (route) => {
    const userFranchiseRes = [{id: 5, name: "pizza5", admins: [{id: 3, name: "name", email: "e@jwt.com"}], stores: [{id: 1, name: "Shrek's palace"}]}];
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: userFranchiseRes });
  });

  await page.route(`/api/franchise/${3}/store`, async(route) => {
    const createStoreReq = {franchiseId: 5, name: "Shrek's palace"};
    const createStoreRes = {id: 1, franchiseId: 5, name: "Shrek's palace"};
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(createStoreReq);
    await route.fulfill({ json: createStoreRes });
  });

  await page.route(`*/**/api/franchise/${3}`, async (route) => {
    const userFranchiseRes = [{id: 5, name: "pizza5", admins: [{id: 3, name: "name", email: "e@jwt.com"}], stores: [{id: 1, name: "Shrek's palace"}]}];
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: userFranchiseRes });
  });

  await page.getByPlaceholder('store name').click();
  await page.getByPlaceholder('store name').fill("Shrek's palace");
  await page.getByRole('button', {name: 'Create'}).click();


  await page.getByRole('link', { name: 'Admin' }).click();


  await page.route(`*/**/api/franchise/${5}`, async (route) => {
    const deleteFranchiseRes = {message: "franchise deleted"};
    expect(route.request().method()).toBe('DELETE');
    await route.fulfill({ json: deleteFranchiseRes });
  });

  await page.getByRole('row', {name: 'pizza5 Close' }).getByRole('button').click();
  await expect(page.locator('h2')).toContainText('Sorry to see you go');
  await page.getByRole('button', { name: 'Close' }).click(); 
 


});

test('create store', async ({ page }) => { 
  await page.route('*/**/api/auth', async (route) => {
    const loginReq = { email: 'f@jwt.com', password: 'b' };
    const loginRes = { user: { id: 3, name: 'name', email: 'f@jwt.com', roles: [{ role: 'admin' }] }, token: 'abc' };
    expect(route.request().method()).toBe('PUT');
    expect(route.request().postDataJSON()).toMatchObject(loginReq);
    await route.fulfill({ json: loginRes });
  });

  await page.route('*/**/api/franchise/*/store', async (route) => {
    const createStoreReq = {franchiseId: 1, name: "Sydney"};
    const createStoreRes =  { id: 1, name: 'Sydney', totalRevenue: 0 };
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(createStoreReq);
    await route.fulfill({ json: createStoreRes });
  });

  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();

  //login admin user
  await page.getByPlaceholder('Email address').click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
  await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('b');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Admin' }).click(); 

  await page.getByRole('contentinfo').getByRole('link', { name: 'Franchise' }).click();
  
  


  await page.route('*/**/api/order/menu', async (route) => {
    const menuRes = [
      { id: 1, title: 'Veggie', image: 'pizza1.png', price: 0.0038, description: 'A garden of delight' },
      { id: 2, title: 'Pepperoni', image: 'pizza2.png', price: 0.0042, description: 'Spicy treat' },
    ];
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: menuRes });
  });

  await page.route('*/**/api/order', async (route) => {
    const orderReq = {
      items: [
        { menuId: 1, description: 'Veggie', price: 0.0038 },
        { menuId: 2, description: 'Pepperoni', price: 0.0042 },
      ],
      storeId: '4',
      franchiseId: 2,
    };
    const orderRes = {
      order: {
        items: [
          { menuId: 1, description: 'Veggie', price: 0.0038 },
          { menuId: 2, description: 'Pepperoni', price: 0.0042 },
        ],
        storeId: '4',
        franchiseId: 2,
        id: 23,
      },
      jwt: 'eyJpYXQ',
    };
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(orderReq);
    await route.fulfill({ json: orderRes });
  });

  await page.route('*/**/api/auth', async (route) => {
    const registerReq = {name: 'Tim', email: 't@jwt.com', password: 'a' };
    const registerRes = { user: { id: 3, name: 'Tim', email: 't@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(registerReq);
    await route.fulfill({ json: registerRes });
  });

  await page.route('*/**/api/auth', async (route) => {
    const loginReq = { email: 'f@jwt.com', password: 'b' };
    const loginRes = { user: { id: 3, name: 'name', email: 'f@jwt.com', roles: [{ role: 'admin' }] }, token: 'abc' };
    expect(route.request().method()).toBe('PUT');
    expect(route.request().postDataJSON()).toMatchObject(loginReq);
    await route.fulfill({ json: loginRes });
  });
});

