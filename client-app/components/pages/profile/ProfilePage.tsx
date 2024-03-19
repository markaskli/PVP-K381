import React from 'react';

interface ProfileProps {
  name: string;
  points: number;
  groups: string[];
  parentName: string;
  registrationDate: string;
  editorName: string;
}

const Profile: React.FC<ProfileProps> = ({
  name,
  points,
  groups,
  parentName,
  registrationDate,
  editorName,
}) => {
  return (
    <div>
      <h1>User Profile</h1>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Points:</strong> {points}
      </p>
      <p>
        <strong>Groups:</strong> {groups.join(', ')}
      </p>
      <p>
        <strong>Parent Name:</strong> {parentName}
      </p>
      <p>
        <strong>Registration Date:</strong> {registrationDate}
      </p>
      <p>
        <strong>Last Edited by:</strong> {editorName}
      </p>
    </div>
  );
};

export default Profile;
