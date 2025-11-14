import { Button, Group } from '@mantine/core';
import { DiscordIcon, GithubIcon, TwitterIcon } from '@mantinex/dev-icons';
import { FacebookIcon } from './FacebookIcon';
import { GoogleIcon } from './GoogleIcon';
import classes from './SocialButtons.module.css';

export function GoogleButton(props) {
  return <Button leftSection={<GoogleIcon />} variant="default" {...props} >Continue with Google</Button>;
}

export function FacebookButton(props) {
  return <Button leftSection={<FacebookIcon />} className={classes.facebookButton} {...props} />;
}

export function DiscordButton(props) {
  return (
    <Button
      className={classes.discordButton}
      leftSection={<DiscordIcon size={16} />}
      {...props}
    />
  );
}

// Twitter button as anchor
export function TwitterButton(props) {
  return (
    <Button
      component="a"
      leftSection={<TwitterIcon size={16} color="#00ACEE" />}
      variant="default"
      {...props}
    />
  );
}

export function GithubButton(props) {
  return (
    <Button
      {...props}
      leftSection={<GithubIcon size={16} />}
      className={classes.githubButton}
    />
  );
}


export function SocialButtons() {
  return (
    <Group justify="center" p="md">
      <GoogleButton>Continue with Google</GoogleButton>
      <TwitterButton href="https://twitter.com/mantinedev" target="_blank">
        Follow on Twitter
      </TwitterButton>
      <FacebookButton>Sign in with Facebook</FacebookButton>
      <GithubButton>Login with GitHub</GithubButton>
      <DiscordButton>Join Discord community</DiscordButton>
    </Group>
  );
}


