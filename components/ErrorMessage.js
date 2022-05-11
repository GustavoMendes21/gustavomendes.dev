/* eslint-disable @next/next/no-img-element */
import ShortcutError from './ShortcutError'
import { Box } from './Box'

export default function ErrorMessage({ code }) {
  let title = 'erro: 500'
  let description = "Something didn't go as expected."

  if (code === 404) {
    title = 'erro: 404'
    description = "It appears that this page does not exist."
  }

  return (
    <Box css={{
      textAlign: 'center', margin: '0 auto', maxWidth: '400px',
    }}>
      <h1>{title}</h1>
      <p>{description}</p>
      <img
        style={{ filter: "grayscale(100%)" }}
        src="/static/images/astronaut.png" alt="Illustration of an astronaut with macbook in hand trying to find the error" />
      <ShortcutError />
    </Box >
  )
}
