import { VscGithubInverted } from 'react-icons/vsc';

/**
 * A footer component displaying copyright information and a link to the project's GitHub repository.
 *
 * @component
 */
export default function Footer() {
  return (
    <footer className='page-footer'>
      <p>© yondav {new Date().getFullYear()}</p>
      <a
        href='https://github.com/yondav/palette-gen'
        target='_blank'
        rel='noopener noreferrer'
      >
        <VscGithubInverted />
      </a>
    </footer>
  );
}
