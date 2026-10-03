function Avatar({ user, size = "sm" }) {
  const classes = ["avatar", size && `avatar--${size}`, user.alt && "avatar--alt"]
    .filter(Boolean)
    .join(" ");
  return <span className={classes}>{user.initials}</span>;
}

export default Avatar;
