import React from 'react'
import { Box, Container, Typography, Paper, Alert } from '@mui/material'
import { PrivacyPolicyStyles } from './PrivacyPolicy.styles'

function PrivacyPolicy() {
  return (
    <Box sx={PrivacyPolicyStyles.container}>
      <Container maxWidth="md">
        <Paper sx={PrivacyPolicyStyles.paper}>
          <Typography variant="h4" component="h1" sx={PrivacyPolicyStyles.title}>
            Privacy Policy
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={PrivacyPolicyStyles.lastUpdated}>
            Last Updated: December 15, 2024
          </Typography>

          <Box sx={PrivacyPolicyStyles.content}>
            <Section
              number="1"
              title="Information We Collect"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    <strong>Personal Information:</strong> We collect information you provide, including:
                  </Typography>
                  <ul>
                    <li>Full name, email address, phone number</li>
                    <li>Date of birth and gender</li>
                    <li>Profile picture</li>
                    <li>Educational institution and school ID</li>
                    <li>Student or professional status</li>
                    <li>Workplace information (for professionals)</li>
                  </ul>
                  <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                    <strong>Usage Information:</strong> We collect data about how you use our platform:
                  </Typography>
                  <ul>
                    <li>Session records and booking history</li>
                    <li>Communication with mentors</li>
                    <li>Platform usage patterns</li>
                    <li>Device information and IP addresses</li>
                  </ul>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    We also use cookies and tracking technologies to enhance your experience.
                  </Typography>
                </>
              }
            />

            <Section
              number="2"
              title="How We Use Your Information"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    We use your information to:
                  </Typography>
                  <ul>
                    <li>Provide and improve our mentoring services</li>
                    <li>Match you with appropriate mentors</li>
                    <li>Communicate about sessions and platform updates</li>
                    <li>Ensure platform safety and security</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </>
              }
            />

            <Section
              number="3"
              title="Information Sharing and Disclosure"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    We share information:
                  </Typography>
                  <ul>
                    <li>Within the platform to facilitate mentor-mentee connections</li>
                    <li>With third-party service providers (hosting, payments, communications, analytics)</li>
                    <li>When required by law or legal process</li>
                    <li>In connection with business transfers or mergers</li>
                  </ul>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    We do not sell your personal information to third parties.
                  </Typography>
                </>
              }
            />

            <Section
              number="4"
              title="Data Security"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    We implement security measures including:
                  </Typography>
                  <ul>
                    <li>Encryption of sensitive data</li>
                    <li>Secure authentication controls</li>
                    <li>Regular security assessments</li>
                    <li>Employee training on data protection</li>
                  </ul>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    However, no internet transmission is 100% secure. While we strive to protect your data, we cannot
                    guarantee absolute security.
                  </Typography>
                </>
              }
            />

            <Section
              number="5"
              title="Data Retention"
              content={
                <>
                  <Typography variant="body1">
                    We retain your personal information for as long as necessary to provide our services and comply with
                    legal obligations. When data is no longer needed, we securely delete or anonymize it.
                  </Typography>
                </>
              }
            />

            <Section
              number="6"
              title="Your Rights and Choices"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    You have the right to:
                  </Typography>
                  <ul>
                    <li>Access your personal information</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to certain processing activities</li>
                    <li>Request data portability</li>
                    <li>Withdraw consent where applicable</li>
                  </ul>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    To exercise these rights, please contact us at privacy@careersync.com
                  </Typography>
                </>
              }
            />

            <Section
              number="7"
              title="Protection of Minors"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    CareerSync may be used by individuals under 18 for educational purposes. We:
                  </Typography>
                  <ul>
                    <li>Require parental consent for users under 18</li>
                    <li>Limit data collection to what is necessary</li>
                    <li>Vet mentors carefully</li>
                    <li>Allow parents/guardians to request access, correction, or deletion of their child's information</li>
                  </ul>
                </>
              }
            />

            <Section
              number="8"
              title="International Data Transfers"
              content={
                <>
                  <Typography variant="body1">
                    Your information may be transferred to and processed in countries other than your own. We implement
                    safeguards to protect your data in accordance with this Privacy Policy.
                  </Typography>
                </>
              }
            />

            <Section
              number="9"
              title="Third-Party Links"
              content={
                <>
                  <Typography variant="body1">
                    Our platform may contain links to third-party websites. We are not responsible for the privacy
                    practices of these sites. Please review their privacy policies before providing any information.
                  </Typography>
                </>
              }
            />

            <Section
              number="10"
              title="Updates to This Privacy Policy"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    We may update this Privacy Policy from time to time. We will notify you of significant changes via
                    email or platform notification.
                  </Typography>
                  <Typography variant="body1">
                    Continued use of the platform after changes constitutes acceptance of the updated policy.
                  </Typography>
                </>
              }
            />

            <Section
              number="11"
              title="Contact Us"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    If you have questions about this Privacy Policy, please contact us:
                  </Typography>
                  <Box sx={PrivacyPolicyStyles.contactInfo}>
                    <Typography variant="body1">
                      <strong>Email:</strong> privacy@careersync.com
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>Address:</strong> CareerSync Privacy Department, 123 Mentor Lane, San Francisco, CA 94105
                    </Typography>
                  </Box>
                </>
              }
            />

            <Alert severity="info" sx={PrivacyPolicyStyles.noticeBox}>
              <Typography variant="body1" fontWeight={600} gutterBottom>
                Important Notice
              </Typography>
              <Typography variant="body2">
                This platform is not intended for collecting personally identifiable information (PII) beyond what is
                necessary for mentoring services. We do not collect or store highly sensitive personal data unless
                required for service provision.
              </Typography>
            </Alert>

            <Box sx={PrivacyPolicyStyles.acknowledgment}>
              <Typography variant="body1" align="center">
                By using CareerSync, you acknowledge that you have read and understood this Privacy Policy.
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
    <Box sx={PrivacyPolicyStyles.section}>
      <Typography variant="h6" component="h2" sx={PrivacyPolicyStyles.sectionTitle}>
        {number}. {title}
      </Typography>
      <Box sx={PrivacyPolicyStyles.sectionContent}>
        {content}
      </Box>
    </Box>
  )
}

export default PrivacyPolicy


