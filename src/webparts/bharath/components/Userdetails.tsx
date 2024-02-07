import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

interface ICurrentUserDetails {
  displayName: string;
  email: string;
  loginName: string;
}

interface IUserdetailsProps {
  context: WebPartContext;
}

const Userdetails: React.FC<IUserdetailsProps> = ({ context }) => {
  const [currentUser, setCurrentUser] = React.useState<ICurrentUserDetails | null>(null);

    const getCurrentUserDetails = () => {
    const endpoint = `${context.pageContext.web.absoluteUrl}/_api/web/currentuser`;

    context.spHttpClient.get(endpoint, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => response.json())
      .then((data: any) => {
        const userDetails: ICurrentUserDetails = {
          displayName: data.Title,
          email: data.Email,
          loginName: data.LoginName,
        };

        setCurrentUser(userDetails);
      })
      .catch((error: any) => {
        console.error('Error getting current user details:', error);
      });

      React.useEffect(() => {
        // Call the function to get current user details when the component mounts
        getCurrentUserDetails();
      }, []); // The empty dependency array ensures that this effect runs once, similar to componentDidMount
    
  };

  return (  
    <div>
      <h2>Current User Details</h2>
      {currentUser && (
        <ul>
          <li><strong>Display Name:</strong> {currentUser.displayName}</li>
          <li><strong>Email:</strong> {currentUser.email}</li>
          <li><strong>Login Name:</strong> {currentUser.loginName}</li>
        </ul>
      )}
    </div>
  );
};

export default Userdetails;
