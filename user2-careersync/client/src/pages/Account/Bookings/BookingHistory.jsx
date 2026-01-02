import { useState, useEffect } from "react";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import AccountTabs from "../../../components/AccountTabs/AccountTabs";
import {
  bookingsAtom,
  bookingsLoadingAtom,
  bookingsErrorAtom,
  fetchBookingsAtom,
} from "../../../atoms/userAtoms";
import {
  PageWrapper,
  TopBar,
  Title,
  Subtitle,
  SectionTitle,
  SessionCard,
  SessionHeader,
  Name,
  Role,
  MetaRow,
  Badge,
  ActionGroup,
  LightButton,
} from "./BookingHistory.styles";
import {
  EventOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import { CircularProgress, Alert, Box } from "@mui/material";
import InvoiceModal from "./InvoiceModal";

export default function BookingHistoryPage() {
  const [openInvoice, setOpenInvoice] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Jotai atoms
  const [bookings] = useAtom(bookingsAtom);
  const loading = useAtomValue(bookingsLoadingAtom);
  const error = useAtomValue(bookingsErrorAtom);
  const fetchBookings = useSetAtom(fetchBookingsAtom);

  // Fetch bookings on mount
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleOpenInvoice = (booking) => {
    setSelectedBooking(booking);
    setOpenInvoice(true);
  };

  const handleCloseInvoice = () => {
    setOpenInvoice(false);
    setSelectedBooking(null);
  };

  // Separate bookings by status
  const upcomingBookings = bookings.filter(
    (booking) => 
      booking.status === 'pending' || 
      booking.status === 'confirmed' ||
      (booking.start_date_snapshot && new Date(booking.start_date_snapshot) > new Date())
  );

  const pastBookings = bookings.filter(
    (booking) => 
      booking.status === 'completed' || 
      booking.status === 'cancelled' ||
      (booking.start_date_snapshot && new Date(booking.start_date_snapshot) < new Date())
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <Badge success>Completed</Badge>;
      case 'cancelled':
        return <Badge danger>Cancelled</Badge>;
      case 'pending':
        return <Badge warning>Pending</Badge>;
      default:
        return null;
    }
  };

  if (loading && bookings.length === 0) {
    return (
      <PageWrapper>
        <TopBar />
        <AccountTabs />
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <CircularProgress />
        </Box>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <TopBar />
      <AccountTabs />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* UPCOMING */}
      <Title>Upcoming Sessions</Title>
      <Subtitle>Your scheduled shadowing sessions</Subtitle>

      {upcomingBookings.length === 0 ? (
        <Box sx={{ padding: 3, textAlign: 'center', color: '#666' }}>
          No upcoming sessions
        </Box>
      ) : (
        upcomingBookings.map((booking) => (
          <SessionCard key={booking.id}>
            <SessionHeader>
              <div>
                <Name>
                  {booking.mentor_name_snapshot || booking.mentorUser?.first_name || 'Unknown Mentor'}
                </Name>
                <Role>
                  {booking.position_name_snapshot || booking.Position?.position_name || 'Mentor'}
                </Role>

                <Badge info>
                  {booking.position_name_snapshot || 'Session'}
                </Badge>

                <MetaRow>
                  <EventOutlined fontSize="small" />
                  {formatDate(booking.start_date_snapshot)}
                </MetaRow>

                {booking.Session?.location_name && (
                  <MetaRow>
                    <LocationOnOutlined fontSize="small" />
                    {booking.Session.location_name}
                  </MetaRow>
                )}
              </div>

              <ActionGroup>
                <LightButton onClick={() => handleOpenInvoice(booking)}>
                  View Invoice
                </LightButton>
              </ActionGroup>
            </SessionHeader>
          </SessionCard>
        ))
      )}

      {/* PAST */}
      <SectionTitle>Past Sessions</SectionTitle>
      <Subtitle>Your completed and cancelled sessions</Subtitle>

      {pastBookings.length === 0 ? (
        <Box sx={{ padding: 3, textAlign: 'center', color: '#666' }}>
          No past sessions
        </Box>
      ) : (
        pastBookings.map((booking) => (
          <SessionCard key={booking.id}>
            <SessionHeader>
              <div>
                <Name>
                  {booking.mentor_name_snapshot || booking.mentorUser?.first_name || 'Unknown Mentor'}
                  {getStatusBadge(booking.status)}
                </Name>
                <Role>
                  {booking.position_name_snapshot || booking.Position?.position_name || 'Mentor'}
                </Role>

                <Badge info>
                  {booking.position_name_snapshot || 'Session'}
                </Badge>

                <MetaRow>
                  <EventOutlined fontSize="small" />
                  {formatDate(booking.start_date_snapshot)}
                </MetaRow>

                {booking.Session?.location_name && (
                  <MetaRow>
                    <LocationOnOutlined fontSize="small" />
                    {booking.Session.location_name}
                  </MetaRow>
                )}
              </div>

              <ActionGroup>
                <LightButton onClick={() => handleOpenInvoice(booking)}>
                  View Details
                </LightButton>
              </ActionGroup>
            </SessionHeader>
          </SessionCard>
        ))
      )}

      {/* INVOICE MODAL */}
      <InvoiceModal
        open={openInvoice}
        onClose={handleCloseInvoice}
        booking={selectedBooking}
      />
    </PageWrapper>
  );
}
