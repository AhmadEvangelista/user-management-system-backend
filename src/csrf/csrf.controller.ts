import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('csrf')
export class CsrfController {
  @Get('token')
  getCsrfToken(@Req() req: Request, @Res() res: Response) {
    // Generate CSRF token using csurf
    const csrfToken =
      req.headers['__host-psifi.x-csrf-token'] ||
      req.headers['__Host-psifi.x-csrf-token'];

    // Set CSRF token as a cookie
    res.cookie('__Host-psifi.x-csrf-token', csrfToken, {
      httpOnly: true, // Ensures cookie is not accessible via JavaScript
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // CSRF protection
      maxAge: 60 * 60 * 1000, // Token expires in 1 hour
    });
    console.log('CSRF TOKEN IN CONTROLLER CSRF');

    // Return the CSRF token in the response
    return res.json({ message: 'CSRF token set in cookie', csrfToken });
  }
}
