exports.accountCreated = (name) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Account Created SuccessFully</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
      .main {
        background-color: #d3d3d3;
        width: 100%;
        padding: 2px;
        border-radius: 5px;
      }
      .heading {
        font-size: 24px;
        text-align: center;
      }
      </style>
  </head>
  <body>
    <p>Hi ${name},</p>
    <div class="main">
      <h3 class="heading">Welcome To Annals</h3>
      <p>Here You can do the following things:</p>
      <ul>
        <li>Write journals</li>
        <li>Store Passwords</li>
        <li>Add/View Ideas</li>
        <li>Make Todo List</li>
      <ul>
    </div>
  </body>
</html>`;
};

exports.verifiedAccount = (name, successUrl, ignoreUrl) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Verify Account</title>
    <style></style>
  </head>
  <body>
    <p>Hi ${name},</p>
    <h2>It's a verification email from annals</h2>
    <a href=${successUrl}>Click here to Verify Your Account</a>
    <h3>
      If this wasn't you
    </h3>
    <a href=${ignoreUrl}>Click here to ignore this action </a>
  </body>
</html>`;
};

exports.forgotPassword = (name, code) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Forgot Password Verification</title>
    <style>
      .box {
        padding: 2px;
        background-color: #4b24bf;
        height: 124px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 25px;
        color: #fff;
        font-size: 32px;
      }
    </style>
  </head>
  <body>
    <h2>Your Forgot Password Verification Code is</h2>
    <p class="box">
      ${code}
    </p>
    <span>This code only valid for 10 mins</span>
    <p>If you are not doing this, ignore this.</p>
  </body>
</html>
`;
};
