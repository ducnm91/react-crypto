import React from "react";

const MediaLink = (props) => {

  return (
    <ul>
      <li><a href={props.tokenInfo?.links?.homepage[0]} target="_blank">Homepage</a></li>
      <li><a href={ `https://twitter.com/${props.tokenInfo?.links?.twitter_screen_name}` } target="_blank">Twitter</a></li>
      { props.tokenInfo?.links?.telegram_channel_identifier && <li><a href={`https://t.me/${props.tokenInfo?.links?.telegram_channel_identifier}`} target="_blank">Telegram</a></li> }
      <li><a href={ props.tokenInfo?.links?.repos_url.github[0] } target="_blank">Source on Github</a></li>
    </ul>
  )
}

export default MediaLink;