import React from 'react'
import GithubIcon from './githubIcon'

const icons = { github: GithubIcon }
const SocialButton = ({ type, onClick }) => {
  const Icon = icons[type] || GithubIcon

  return (
    <div
      is="button"
      type="button"
      elevation={1}
      paddingY="14px"
      paddingX="17px"
      width="100%"
      maxWidth="345px"
      background={type === 'Google' ? 'white' : '#121212'}
      cursor="pointer"
      style={{ border: '0px solid' }}
      color={type === 'Google' ? 'black' : 'white'}
      onClick={onClick}
    >
      <a display="flex" justifyContent="space-evenly" alignItems="center" fontSize="20px">
        <Icon />
        <span style={{ fontSize: '1.2rem' }}>
          {'Continue with '}
          <strong>{type}</strong>
        </span>
      </a>
    </div>
  )
}

export default SocialButton
