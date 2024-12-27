/* eslint-disable prettier/prettier */
const createVerifyHtml = (emailToken: string): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #f9f9f9;">
      <div style="text-align: center; margin-bottom: 20px;">
        <!-- Replace the src attribute with the URL of your actual logo -->
        <img src="https://via.placeholder.com/150" alt="Food Share Logo" style="max-width: 100px; border-radius: 50%;" />
      </div>
      <h1 style="font-size: 24px; text-align: center; color: #333; margin-bottom: 10px;">Welcome to Food Share!</h1>
      <p style="font-size: 16px; color: #555; text-align: center; margin-bottom: 20px;">
        Thank you for joining Food Share, the social network for sharing and discovering amazing food. Let's make sharing meals a delightful experience!
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="http://localhost:5001/user/email/verify/${emailToken}" 
           style="background-color: #ff7043; color: white; padding: 15px 25px; font-size: 16px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Activate Your Account
        </a>
      </div>
      <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">
        If you did not create a Food Share account, you can safely ignore this email.
      </p>
      <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 30px 0;" />
      <p style="font-size: 12px; color: #999; text-align: center;">
        &copy; 2024 Food Share. All rights reserved.
      </p>
    </div>
  `
}

export default createVerifyHtml;

