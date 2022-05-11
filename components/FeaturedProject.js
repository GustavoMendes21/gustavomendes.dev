import { styled } from '../stitches.config'
import { useState } from 'react'
import { motion } from 'framer-motion'

import Image from 'next/image'

export default function FeaturedProject(props) {
  const { project } = props

  return (
    <Project href={project.url} target="_blank">
      <Animation index={props.index}>
        <IconContainer>
          <Image alt={project.title} src={project.imageUrl} width="350" height="200"/>
        </IconContainer>
        <Body>
          <Title>{project.title}</Title>
          <Description>{project.description}</Description>
          {project.stats && <Stats>{project.stats}</Stats>}
        </Body>
      </Animation>
    </Project>
  )
}

function Animation(props) {
  const [hovered, setHovered] = useState('')
  const isHovered = hovered === props.index

  return (
    <AnimContainer
      onHoverStart={() => setHovered(props.index)}
      onHoverEnd={() => setHovered('')}
    >
      {isHovered && (
        <AnimHovered
          layoutId="featuredProjects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {props.children}
    </AnimContainer>
  )
}

const Project = styled('a', {
  display: 'flex',
  flexWrap: 'wrap',
  transition: 'opacity $duration ease-in-out',
  border: '1px solid #212024',
  borderRadius: '$borderRadius',
  textDecoration: 'none',
  width: 'auto',
  '&:hover': { opacity: 1 },
  '@bp2': { width: 350 },
})

const IconContainer = styled('div', {
  color: '$primary',
  fontSize: '24px',
})

const Body = styled('div', {
  width: '100%',
})

const Title = styled('p', {
  color: '$primary',
  margin: '10px 0 0 0',
  fontSize: '18px',
})

const Description = styled('p', {
  margin: '10px 0 0 0',
  width: '100%',
  height: '70px',
  color: '$secondary',
  lineHeight: '24px',
  wordWrap: 'break-word',
  overflow: 'hidden',
})

const Stats = styled('p', {
  margin: '5px 0 0',
  color: '$primary',
  textTransform: 'uppercase',
  display: 'inline-block',
  fontWeight: 500,
  letterSpacing: '1.2px',
  fontSize: '12px',
})

const AnimContainer = styled(motion.span, {
  position: 'relative',
  width: '100%',
  padding: '20px',
})

const AnimHovered = styled(motion.span, {
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  background: '$hover',
  borderRadius: '$borderRadius',
  zIndex: -1,
})
