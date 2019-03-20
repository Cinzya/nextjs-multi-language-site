import React from 'react';
import { Link, RichText } from 'prismic-reactjs';
import { linkResolver } from '../../prismic-configuration';

// WARNING! Needs to be able internal links as well

export default class ImageHighlight extends React.Component {
  render() {
    return (
      <React.Fragment>
        <section className="highlight content-section">
          <div className="highlight-left">
            {RichText.render(this.props.slice.primary.title, linkResolver)}
            {RichText.render(this.props.slice.primary.headline, linkResolver)}
            {RichText.asText(this.props.slice.primary.link_label) !== "" ? (
              <p>
                <a href={Link.url(this.props.slice.primary.link, linkResolver)}>
                  {RichText.asText(this.props.slice.primary.link_label)}
                </a>
              </p>
            ) : '' }
          </div>
          <div className="highlight-right">
            <img src={this.props.slice.primary.featured_image.url} alt={this.props.slice.primary.featured_image.alt} />
          </div>
        </section>
        <style jsx>{`
          .highlight {
            position: relative;
            overflow: auto;
          }
          .highlight-left {
            width: 43%;
            float: left;
          }
          .highlight-right {
            width: 48%;
            float: right;
          }
          @media (max-width: 767px) {
            .highlight-left,
            .highlight-right {
              width: 100%;
              float: none;
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}