import { styled } from '../stitches.config'
import { Box } from './Box'
import * as React from 'react'
import { useRouter } from 'next/router'
import {
  KBarAnimator,
  KBarProvider,
  KBarPortal,
  useDeepMatches,
  KBarPositioner,
  KBarSearch,
  KBarResults,
} from 'kbar'

import { FaInstagram, FaGithub, FaLinkedin, FaTwitch, FaYoutube, FaTwitter, FaTiktok } from "react-icons/fa";
import { RiBracesLine, RiRocketLine } from "react-icons/ri";

export default function CommandBar(props) {
  const router = useRouter()

  const actions = [
    {
      id: 'copy',
      name: 'Copiar Url',
      shortcut: ['u'],
      keywords: 'copy-url',
      section: 'General',
      perform: () => navigator.clipboard.writeText(window.location.href),
      icon: <Icon className="ri-file-copy-line" />,
    },
    {
      id: 'email',
      name: 'Enviar E-mail',
      shortcut: ['e'],
      keywords: 'send-email',
      section: 'General',
      perform: () => window.open('mailto:gustavomendes2112@hotmail.com', '_blank'),
      icon: <Icon className="ri-mail-line" />,
    },
    {
      id: 'home',
      name: 'Home',
      shortcut: ['g', 'h'],
      keywords: 'go-home',
      section: 'Go to',
      perform: () => router.push('/'),
      icon: <Icon className="ri-home-5-line" />,
    },
    {
      id: 'about',
      name: 'Sobre',
      shortcut: ['g', 'a'],
      keywords: 'go-about',
      section: 'Go to',
      perform: () => router.push('/about'),
      icon: <Icon className="ri-user-line" />,
    },
    {
      id: 'projects',
      name: 'Projetos',
      shortcut: ['g', 'p'],
      keywords: 'go-projects',
      section: 'Go to',
      perform: () => router.push('/projects'),
      icon: <Icon className="ri-lightbulb-line" />,
    },
    {
      id: 'instagram',
      name: 'Instagram',
      shortcut: ['f', 'i'],
      keywords: 'go-instagram',
      section: 'Follow',
      perform: () => window.open('https://instagram.com/gustavoomendes21', '_blank'),
      icon: <Icon className="ri-instagram-line" />,
    },
    {
      id: 'github',
      name: 'Github',
      shortcut: ['f', 'g'],
      keywords: 'go-github',
      section: 'Follow',
      perform: () => window.open('https://github.com/gustavomendes21', '_blank'),
      icon: <Icon className="ri-github-line" />,
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      shortcut: ['f', 'l'],
      keywords: 'go-linkedin',
      section: 'Follow',
      perform: () => window.open('https://linkedin.com/in/gustavomendes21', '_blank'),
      icon: <Icon className="ri-linkedin-line" />,
    },
    {
      id: 'rocketseat',
      name: 'Rocketseat',
      shortcut: ['f', 'r'],
      keywords: 'go-rocketseat',
      section: 'Follow',
      perform: () => window.open('https://app.rocketseat.com.br/me/gustavomendes21', '_blank'),
      icon: <Icon className="ri-rocket-line" />,
    }
  ]

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <Positioner>
          <Animator>
            <Search placeholder="Type a command or search..." />
            <RenderResults />
          </Animator>
        </Positioner>
      </KBarPortal>

      {props.children}
    </KBarProvider>
  )
}

function RenderResults() {
  const { results } = useDeepMatches()

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <GroupName>{item}</GroupName>
        ) : (
          <ResultItem action={item} active={active} />
        )
      }
    />
  )
}

const ResultItem = React.forwardRef(({ action, active }, ref) => {
  return (
    <Box ref={ref} css={getResultStyle(active)}>
      <Action>
        {action.icon && action.icon}
        <ActionRow>
          <span>{action.name}</span>
        </ActionRow>
      </Action>
      {action.shortcut?.length ? (
        <Shortcut aria-hidden>
          {action.shortcut.map(shortcut => (
            <Kbd key={shortcut}>{shortcut}</Kbd>
          ))}
        </Shortcut>
      ) : null}
    </Box>
  )
})

ResultItem.displayName = 'ResultItem'

const Positioner = styled(KBarPositioner, {
  position: 'fixed',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '100%',
  inset: '0px',
  padding: '14vh 16px 16px',
  background: 'rgba(0, 0, 0, .8)',
  boxSizing: 'border-box',
})

const Search = styled(KBarSearch, {
  padding: '12px 16px',
  fontSize: '16px',
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',
  border: 'none',
  margin: 0,
  background: '$command',
  color: '$primary',
})

const GroupName = styled('div', {
  padding: '8px 16px',
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  background: '$command',
})

const Icon = styled('i', {
  fontSize: '20px',
  position: 'relative',
  top: '-2px',
})

const Kbd = styled('kbd', {
  background: 'rgba(255, 255, 255, .1)',
  color: '$secondary',
  padding: '4px 8px',
  textTransform: 'uppercase',
})

const Shortcut = styled('div', {
  display: 'grid',
  gridAutoFlow: 'column',
  gap: '4px',
})

const Action = styled('div', {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
})

const ActionRow = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

const Animator = styled(KBarAnimator, {
  backgroundColor: '#1a1c1e',
  maxWidth: '600px',
  width: '100%',
  color: '$primary',
  borderRadius: '8px',
  overflow: 'hidden',
  '@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))': {
    backgroundColor: '$command',
    WebkitBackdropFilter: 'saturate(300%) blur(25px)',
    backdropFilter: 'saturate(300%) blur(25px)',
  },
})

const getResultStyle = active => {
  return {
    padding: '12px 16px',
    background: active ? 'rgba(255, 255, 255, 0.1)' : '$command',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    cursor: 'pointer',
    color: active ? '$primary' : '$secondary',
  }
}
