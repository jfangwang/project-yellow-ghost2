import GuestPic from '../images/guest-profile-pic.png';
import RickPic from '../images/rick-profile-pic.jpg';
import MortyPic from '../images/morty-profile-pic.jpg';
import {v4 as uuidv4} from 'uuid';

const newDate = new Date().toLocaleString();
const guestID = uuidv4();
const rickID = uuidv4();
const mortyID = uuidv4();

export const Guest = {
  addedMe: {},
  brokeup: {},
  created: newDate,
  deleteSnaps: {},
  email: 'Guest@Guest.com',
  friends: {
    [guestID]: {
      created: newData,
      email: 'Guest@Guest.com',
      id: guestID,
      lastTimeStamp: null,
      messages: {},
      name: 'Guest',
      nickname: 'Guest',
      openedByMe: {
        lastTimeStamp: null,
        opened: 0,
      },
      openedByFriend: {
        lastTimeStamp: null,
        opened: 0,
      },
      phoneNumber: null,
      profilePicUrl: guestID,
      received: {
        lastTimeStamp: null,
        received: 0,
      },
      sent: {
        lastTimeStamp: null,
        sent: 0,
      },
    },
  },
  faceIDURL: null,
  id: guestID,
  loggedOffTimeStamp: null,
  memories: {},
  name: 'Guest',
  pending: {},
  phoneNumber: null,
  profilePicUrl: GuestPic,
  received: 0,
  story: {},
  sent: 0,
  streakEmoji: '\u{1F525}',
  username: 'Guest123',
};

const Rick = {
  addedMe: {},
  brokeup: {},
  created: newDate,
  deleteSnaps: {},
  email: 'Rick@Guest.com',
  friends: {},
  faceIDURL: null,
  id: rickID,
  loggedOffTimeStamp: null,
  memories: {},
  name: 'Guest',
  pending: {},
  phoneNumber: null,
  profilePicUrl: RickPic,
  received: 0,
  story: {},
  sent: 0,
  streakEmoji: '\u{1F525}',
  username: 'Guest123',
};
