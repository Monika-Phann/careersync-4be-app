import React from 'react'
import { Box, Container, Typography, Paper } from '@mui/material'
import { TermsAndConditionsStyles } from './TermsAndConditions.styles'

function TermsAndConditions() {
  return (
    <Box sx={TermsAndConditionsStyles.container}>
      <Container maxWidth="md">
        <Paper sx={TermsAndConditionsStyles.paper}>
          <Typography variant="h4" component="h1" sx={TermsAndConditionsStyles.title}>
            Terms and Conditions
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={TermsAndConditionsStyles.lastUpdated}>
            Last Updated: December 15, 2024
          </Typography>

          <Box sx={TermsAndConditionsStyles.content}>
            <Section
              number="1"
              title="Acceptance of Terms"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    By accessing or using CareerSync ("the Platform"), you agree to be bound by these Terms and Conditions.
                    If you do not agree to these terms, please do not use our service.
                  </Typography>
                  <Typography variant="body1">
                    Continued use of CareerSync's mentoring platform and services constitutes your acceptance of these terms.
                  </Typography>
                </>
              }
            />

            <Section
              number="2"
              title="User Eligibility"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    To use CareerSync, you agree to:
                  </Typography>
                  <ul>
                    <li>Provide accurate and complete registration information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Accept full responsibility for all activities under your account</li>
                    <li>If you are under 18, obtain parental or guardian consent</li>
                  </ul>
                </>
              }
            />

            <Section
              number="3"
              title="Mentee Responsibilities"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    As a mentee, you agree to:
                  </Typography>
                  <ul>
                    <li>Attend scheduled mentoring sessions or provide advance notice of cancellation</li>
                    <li>Be prepared and engaged during sessions</li>
                    <li>Respect the mentor's time and expertise</li>
                    <li>Provide honest feedback about sessions</li>
                    <li>Use the platform for educational and career development purposes only</li>
                    <li>Communicate professionally and respectfully with mentors</li>
                  </ul>
                </>
              }
            />

            <Section
              number="4"
              title="Session Booking and Cancellation"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    Mentoring sessions are scheduled through the Platform's booking system. Both parties agree to:
                  </Typography>
                  <ul>
                    <li>Provide at least 24 hours notice for session cancellations</li>
                    <li>Reschedule missed sessions in good faith</li>
                    <li>Use the Platform's communication tools for session coordination</li>
                  </ul>
                </>
              }
            />

            <Section
              number="5"
              title="Intellectual Property"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    All content on CareerSync, including text, graphics, logos, and software, is the property of CareerSync
                    or its content suppliers and is protected by intellectual property laws.
                  </Typography>
                  <Typography variant="body1">
                    You retain ownership of content you create but grant CareerSync a license to use, modify, and display
                    such content for Platform operations and improvements.
                  </Typography>
                </>
              }
            />

            <Section
              number="6"
              title="Prohibited Conduct"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    You must not:
                  </Typography>
                  <ul>
                    <li>Use the Platform for any unlawful purpose</li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>Share false or misleading information</li>
                    <li>Attempt to gain unauthorized access to the Platform</li>
                    <li>Collect user data without consent</li>
                    <li>Use the Platform for commercial solicitation without authorization</li>
                  </ul>
                </>
              }
            />

            <Section
              number="7"
              title="Privacy and Data Protection"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    Your use of CareerSync is governed by our Privacy Policy. We collect and use your information as
                    described in the Privacy Policy to provide and improve our services.
                  </Typography>
                </>
              }
            />

            <Section
              number="8"
              title="Limitation of Liability"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    CareerSync provides a platform for connecting mentors and mentees but does not guarantee specific
                    outcomes from mentoring relationships.
                  </Typography>
                  <Typography variant="body1">
                    To the fullest extent permitted by law, CareerSync is not liable for any indirect, incidental, special,
                    consequential, or punitive damages resulting from your use of the Platform.
                  </Typography>
                </>
              }
            />

            <Section
              number="9"
              title="Account Termination"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    CareerSync reserves the right to suspend or terminate accounts that violate these Terms and Conditions
                    or engage in harmful conduct.
                  </Typography>
                  <Typography variant="body1">
                    You may deactivate your account at any time through your account settings.
                  </Typography>
                </>
              }
            />

            <Section
              number="10"
              title="Modifications to Terms"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    CareerSync reserves the right to modify these Terms and Conditions at any time. We will notify users of
                    significant changes via email or Platform notification.
                  </Typography>
                  <Typography variant="body1">
                    Continued use of the Platform after changes constitutes acceptance of the modified terms.
                  </Typography>
                </>
              }
            />

            <Section
              number="11"
              title="Governing Law"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    These Terms and Conditions are governed by and construed in accordance with applicable laws.
                  </Typography>
                  <Typography variant="body1">
                    Any disputes arising from these terms shall be resolved through binding arbitration.
                  </Typography>
                </>
              }
            />

            <Section
              number="12"
              title="Contact Information"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    If you have questions about these Terms and Conditions, please contact us:
                  </Typography>
                  <Box sx={TermsAndConditionsStyles.contactInfo}>
                    <Typography variant="body1">
                      <strong>Email:</strong> legal@careersync.com
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>Address:</strong> CareerSync Legal Department, 123 Mentor Lane, San Francisco, CA 94105
                    </Typography>
                  </Box>
                </>
              }
            />

            <Box sx={TermsAndConditionsStyles.acknowledgment}>
              <Typography variant="body1" align="center">
                By using CareerSync, you acknowledge that you have read and understood these Terms and Conditions.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

function Section({ number, title, content }) {
  return (
    <Box sx={TermsAndConditionsStyles.section}>
      <Typography variant="h6" component="h2" sx={TermsAndConditionsStyles.sectionTitle}>
        {number}. {title}
      </Typography>
      <Box sx={TermsAndConditionsStyles.sectionContent}>
        {content}
      </Box>
    </Box>
  )
}

export default TermsAndConditions


