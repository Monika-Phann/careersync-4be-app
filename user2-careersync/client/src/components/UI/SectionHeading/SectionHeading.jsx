import { SectionHeadingContainer, SectionTitle, SectionSubtitle } from './SectionHeading.styles'

function SectionHeading({ title, subtitle, align = 'center' }) {
  return (
    <SectionHeadingContainer align={align}>
      <SectionTitle variant="h2" component="h2">
        {title}
      </SectionTitle>
      {subtitle && <SectionSubtitle variant="body1">{subtitle}</SectionSubtitle>}
    </SectionHeadingContainer>
  )
}

export default SectionHeading

