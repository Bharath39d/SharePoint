import * as React from 'react';
import styles from './Projecttwo.module.scss';
import { IProjecttwoProps } from './IProjecttwoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
// import  Getlistitems from './Getlistitems';

export default class Projecttwo extends React.Component<IProjecttwoProps, {}> {
  public render(): React.ReactElement<IProjecttwoProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    const items = sp.web.lists.getByTitle("MyTestList").items();
    console.log(items);

    return (
      <section className={`${styles.projecttwo} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{escape(description)}</strong></div>
        </div>
        <div>
          <h3>Welcome to SharePoint Framework!</h3>

          
        </div>
      </section>
    );
  }
}
