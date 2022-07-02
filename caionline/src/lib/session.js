// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions

export const ironOptions = {
  cookieName: 'caionline',
  password: 'complex_password_at_least_32_characters_long',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
};
