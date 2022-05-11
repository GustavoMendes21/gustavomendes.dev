import { styled } from '../stitches.config'
import { FaInstagram, FaGithub, FaLinkedin, FaTwitch, FaYoutube, FaTwitter, FaTiktok } from "react-icons/fa";
import { RiBracesLine, RiRocketLine } from "react-icons/ri";

export default function Footer() {
  const links = [
    {
      title: 'Instagram',
      url: 'https://instagram.com/gustavoomendes21',
      icon: <FaInstagram color='#e1306c' />,
      color: '#e1306c',
    },
    {
      title: 'GitHub',
      url: 'https://github.com/gustavomendes21',
      icon: <FaGithub color='#777' />,
      color: '#777',

    },
    {
      title: 'LinkedIn',
      url: 'https://linkedin.com/in/gustavomendes21',
      icon: <FaLinkedin color='#0077b5' />,
      color: '#0077b5',

    },
    {
      title: 'Rocketseat',
      url: 'https://app.rocketseat.com.br/me/gustavomendes21',
      icon: <RiRocketLine color='#8257E5' />,
      color: '#8257E5',

    },
    {
      title: 'Source',
      url: 'https://github.com/GustavoMendes21/gustavomendes.dev',
      icon: <RiBracesLine color='#44475a' />,
      color: '#44475a',

    },
  ]

  return (
    <>
      <Container>
        {links.map((link, index) => {
          return (
            <Anchor
              css={{
                "&:hover": {
                  color: link.color,
                  "i::before": {
                    color: link.color,
                  }
                }
              }}

              key={index} href={link.url} target="_blank">
              <Title>{link.title}</Title>
              <Icon>{link.icon}</Icon>
            </Anchor>
          )
        })}
      </Container>
    </>
  )
}

const Container = styled('footer', {
  background: '$background',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px 0',
  zIndex: '1',
})

const Icon = styled('i', {
  color: '$primary',
  opacity: 1,
  marginLeft: '5px',
  marginTop: '1px',
  fontSize: '18px',
  '@bp2': { opacity: 0, fontSize: '16px' },
})

const Anchor = styled('a', {
  color: '$secondary',
  display: 'flex',
  fontSize: '15px',
  border: 0,
  marginLeft: '20px',
  textDecoration: 'none',
  textTransform: 'lowercase',
  transition: 'color $duration ease-in-out',
  '&:hover, &:focus': {
    opacity: 1,
  },
  [`&:hover ${Icon}`]: {
    transition: 'opacity $duration ease-in-out',
    opacity: 1,
  },
  '&:first-child': { margin: '0' },
})

const Title = styled('span', {
  display: 'none',
  '@bp2': { display: 'block' },
})
