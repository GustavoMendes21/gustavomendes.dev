import { styled } from '../stitches.config'

export const FeaturedProjects = styled('div', {
  margin: '10px 0 0 -20px',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  gap: '20px',
  '@bp2': { flexDirection: 'row' },
})
