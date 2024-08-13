import { Button } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./Footer.module.css";

const Footer = ({ className = "" }) => {
  return (
    <div className={[styles.footer, className].join(" ")}>
      <div className={styles.footerInner}>
        <div className={styles.jeeCodeParent}>
          <div className={styles.jeeCode}>JEE Code</div>
          <img
            className={styles.flyingMortarboardIcon}
            loading="lazy"
            alt=""
            src="/icons/Flying Mortarboard.png"
          />
        </div>
      </div>
      <footer className={styles.sidebar}>
        <div className={styles.navigation}>
          <div className={styles.home}>Home</div>
          <div className={styles.forStudent}>For Student</div>
          <div className={styles.resources}>Resources</div>
          <div className={styles.aboutUs}>About Us</div>
          <div className={styles.contactUs}>Contact Us</div>
        </div>
        <div className={styles.socialLinksContainerWrapper}>
          <div className={styles.socialLinksContainer}>
            <div className={styles.socialIconsRow}>
              <div className={styles.socialIconsRowInner}>
                <div className={styles.socialIconsParent}>
                  <div className={styles.socialIcons} />
                  <img
                    className={styles.whatsappIcon}
                    loading="lazy"
                    alt=""
                    src="/icons/WhatsApp.png"
                  />
                </div>
              </div>
              <div className={styles.socialIconsRowChild}>
                <div className={styles.ellipseParent}>
                  <div className={styles.frameChild} />
                  <img
                    className={styles.facebookIcon}
                    loading="lazy"
                    alt=""
                    src="/icons/Facebook.png"
                  />
                </div>
              </div>
              <div className={styles.frameDiv}>
                <div className={styles.ellipseGroup}>
                  <div className={styles.frameItem} />
                  <img
                    className={styles.twitterIcon}
                    loading="lazy"
                    alt=""
                    src="/icons/Twitter.png"
                  />
                </div>
              </div>
              <div className={styles.socialIconsRowInner1}>
                <div className={styles.ellipseContainer}>
                  <div className={styles.frameInner} />
                  <img
                    className={styles.emailIcon}
                    loading="lazy"
                    alt=""
                    src="/icons/Email.png"
                  />
                </div>
              </div>
              <div className={styles.socialIconsRowInner2}>
                <div className={styles.ellipseParent1}>
                  <div className={styles.ellipseDiv} />
                  <img
                    className={styles.youtubeIcon}
                    loading="lazy"
                    alt=""
                    src="/icons/YouTube.png"
                  />
                </div>
              </div>
              <div className={styles.socialIconsRowInner3}>
                <div className={styles.ellipseParent2}>
                  <div className={styles.frameChild1} />
                  <img
                    className={styles.instagramIcon}
                    loading="lazy"
                    alt=""
                    src="/icons/Instagram.png"
                  />
                </div>
              </div>
            </div>
            <div className={styles.socialLinksContainerInner}>
              <Button
                className={styles.frameButton}
                disableElevation
                variant="outlined"
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  fontSize: "21.1",
                  borderColor: "#fff",
                  borderRadius: "47.87px",
                  "&:hover": { borderColor: "#fff" },
                  height: 53.7,
                }}
              >
                Indore, India
              </Button>
            </div>
          </div>
        </div>
      </footer>
      <div className={styles.copyrightJee}>Copyright @ JEE Code. Inc.</div>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;