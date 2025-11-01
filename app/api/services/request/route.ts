import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

// Email template for client confirmation
const getClientEmailTemplate = (data: any) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #1c1c1c; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #3b8b87; color: #1c1c1c; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 900; }
    .content { padding: 30px; background: #f5f5f5; }
    .section { margin-bottom: 20px; }
    .section h2 { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
    .info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #3b8b87; }
    .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
    .button { display: inline-block; background: #3b8b87; color: #1c1c1c; padding: 12px 30px; text-decoration: none; font-weight: bold; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>REQUEST RECEIVED!</h1>
    </div>
    
    <div class="content">
      <p>Hi ${data.name},</p>
      
      <p>Thank you for reaching out! I've received your service request and I'm excited to learn more about your project.</p>
      
      <div class="section">
        <h2>Your Request Details:</h2>
        <div class="info-box">
          <strong>Selected Services:</strong><br>
          ${data.selectedServices.join(', ')}
        </div>
        <div class="info-box">
          <strong>Project Type:</strong> ${data.projectType}<br>
          <strong>Budget:</strong> ${data.budget}<br>
          <strong>Timeline:</strong> ${data.timeline}
        </div>
        <div class="info-box">
          <strong>Description:</strong><br>
          ${data.description}
        </div>
      </div>
      
      <p><strong>What happens next?</strong></p>
      <ol>
        <li>I'll review your request within 24 hours</li>
        <li>I'll send you an email with questions or a proposal</li>
        <li>We can schedule a call to discuss details</li>
        <li>Once agreed, we'll start the project!</li>
      </ol>
      
      <p>If you have any urgent questions, feel free to reply to this email.</p>
      
      <p>Best regards,<br>
      <strong>Ziad Ayman</strong><br>
      Frontend Developer</p>
    </div>
    
    <div class="footer">
      <p>© 2025 Ziad Ayman. All rights reserved.</p>
      <p>This is an automated confirmation email.</p>
    </div>
  </div>
</body>
</html>
`;

// Email template for admin notification
const getAdminEmailTemplate = (data: any, requestId: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #1c1c1c; }
    .container { max-width: 700px; margin: 0 auto; padding: 20px; }
    .header { background: #3b8b87; color: #1c1c1c; padding: 30px; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 900; }
    .content { padding: 30px; background: #f5f5f5; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
    .info-box { background: white; padding: 15px; border-left: 4px solid #3b8b87; }
    .info-box strong { display: block; margin-bottom: 5px; color: #3b8b87; }
    .full-width { grid-column: 1 / -1; }
    .button { display: inline-block; background: #3b8b87; color: #1c1c1c; padding: 12px 30px; text-decoration: none; font-weight: bold; margin: 20px 0; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 NEW SERVICE REQUEST</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.8;">Request ID: ${requestId}</p>
    </div>
    
    <div class="content">
      <h2>Client Information</h2>
      <div class="info-grid">
        <div class="info-box">
          <strong>Name</strong>
          ${data.name}
        </div>
        <div class="info-box">
          <strong>Email</strong>
          ${data.email}
        </div>
        ${data.phone ? `
        <div class="info-box">
          <strong>Phone</strong>
          ${data.phone}
        </div>` : ''}
        ${data.company ? `
        <div class="info-box">
          <strong>Company</strong>
          ${data.company}
        </div>` : ''}
        ${data.website ? `
        <div class="info-box full-width">
          <strong>Website</strong>
          <a href="${data.website}">${data.website}</a>
        </div>` : ''}
      </div>
      
      <h2>Project Details</h2>
      <div class="info-grid">
        <div class="info-box">
          <strong>Project Type</strong>
          ${data.projectType}
        </div>
        <div class="info-box">
          <strong>Budget</strong>
          ${data.budget}
        </div>
        <div class="info-box">
          <strong>Timeline</strong>
          ${data.timeline}
        </div>
        <div class="info-box full-width">
          <strong>Selected Services</strong>
          ${data.selectedServices.join(', ')}
        </div>
        <div class="info-box full-width">
          <strong>Description</strong>
          <p style="margin: 5px 0 0 0;">${data.description}</p>
        </div>
        ${data.goals ? `
        <div class="info-box full-width">
          <strong>Goals</strong>
          <p style="margin: 5px 0 0 0;">${data.goals}</p>
        </div>` : ''}
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/requests/${requestId}" class="button">
          VIEW IN DASHBOARD →
        </a>
      </div>
    </div>
  </div>
</body>
</html>
`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'projectType', 'budget', 'timeline', 'description', 'selectedServices'];
    for (const field of requiredFields) {
      if (!body[field] || (Array.isArray(body[field]) && body[field].length === 0)) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get client IP and user agent for tracking
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Create service request in database
    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        company: body.company || null,
        website: body.website || null,
        projectType: body.projectType,
        budget: body.budget,
        timeline: body.timeline,
        description: body.description,
        goals: body.goals || null,
        status: 'PENDING',
        priority: 'MEDIUM',
        ipAddress,
        userAgent,
        services: {
          create: body.selectedServices.map((serviceId: string) => ({
            service: {
              connect: { id: serviceId }
            }
          }))
        }
      },
      include: {
        services: {
          include: {
            service: true
          }
        }
      }
    });

    // Prepare data for emails
    const emailData = {
      ...body,
      selectedServices: serviceRequest.services.map(rs => rs.service.name)
    };

    // Send confirmation email to client
    try {
      await resend.emails.send({
        from: 'Ziad Ayman <noreply@yourdomain.com>', // Update with your domain
        to: body.email,
        subject: 'Service Request Received - Ziad Ayman',
        html: getClientEmailTemplate(emailData)
      });

      // Log email sent
      await prisma.emailLog.create({
        data: {
          to: body.email,
          subject: 'Service Request Received',
          type: 'CONFIRMATION',
          status: 'SENT',
          sentAt: new Date(),
          requestId: serviceRequest.id
        }
      });
    } catch (emailError) {
      console.error('Error sending client email:', emailError);
      // Don't fail the request if email fails
    }

    // Send notification email to admin
    try {
      await resend.emails.send({
        from: 'Portfolio Notifications <noreply@yourdomain.com>', // Update with your domain
        to: process.env.ADMIN_EMAIL || 'zyadd.aymann@gmail.com',
        subject: `🎯 New Service Request from ${body.name}`,
        html: getAdminEmailTemplate(emailData, serviceRequest.id)
      });

      // Log email sent
      await prisma.emailLog.create({
        data: {
          to: process.env.ADMIN_EMAIL || 'zyadd.aymann@gmail.com',
          subject: 'New Service Request',
          type: 'CUSTOM',
          status: 'SENT',
          sentAt: new Date(),
          requestId: serviceRequest.id
        }
      });
    } catch (emailError) {
      console.error('Error sending admin email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Service request submitted successfully',
      requestId: serviceRequest.id
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating service request:', error);
    
    return NextResponse.json(
      { error: 'Failed to submit service request. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch available services (for the form)
export async function GET(request: NextRequest) {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json({
      success: true,
      services
    });

  } catch (error) {
    console.error('Error fetching services:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}