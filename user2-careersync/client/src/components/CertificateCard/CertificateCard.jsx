import {
  CardWrapper,
  CardContentStyled,
  Title,
  MetaRow,
  MetaText,
  Actions,
  ViewButton,
  DownloadButton,
} from "./CertificateCard.styles";

import {
  CalendarTodayOutlined,
  OpenInNewOutlined,
  DownloadOutlined,
} from "@mui/icons-material";

export default function CertificateCard({
  title,
  mentor,
  date,
  onView,
  onDownload,
}) {
  return (
    <CardWrapper>
      <CardContentStyled>
        <div>
          <Title>{title}</Title>

          <MetaRow>
            <MetaText>Mentor: {mentor}</MetaText>
          </MetaRow>

          <MetaRow>
            <CalendarTodayOutlined fontSize="small" />
            <MetaText>{date}</MetaText>
          </MetaRow>
        </div>

        <Actions>
          <ViewButton
            startIcon={<OpenInNewOutlined />}
            onClick={onView}
          >
            View
          </ViewButton>

          <DownloadButton
            startIcon={<DownloadOutlined />}
            onClick={onDownload}
          >
            Download
          </DownloadButton>
        </Actions>
      </CardContentStyled>
    </CardWrapper>
  );
}
