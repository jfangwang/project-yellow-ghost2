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
  email: 'jonnyAppleseed@Guest.com',
  faceIDURL: null,
  firstName: 'Jonny',
  friends: {
    [guestID]: {
      created: newDate,
      email: 'jonnyAppleseed@Guest.com',
      friendship: newDate,
      firstName: 'Jonny',
      id: guestID,
      lastName: 'Appleseed',
      lastTimeStamp: null,
      messages: {},
      newSnaps: {},
      nickname: null,
      openedByMe: {
        lastTimeStamp: null,
        opened: 0,
      },
      openedByFriend: {
        lastTimeStamp: null,
        opened: 0,
      },
      phoneNumber: null,
      profilePicUrl: GuestPic,
      readSnaps: [],
      received: {
        lastTimeStamp: null,
        receivedSnaps: 0,
      },
      sent: {
        lastTimeStamp: null,
        sentSnaps: 0,
      },
      status: 'new-friend',
      streak: 0,
      streakRef: null,
      username: 'jonny_appleseed123',
    },
  },
  id: guestID,
  lastName: 'Appleseed',
  loggedOffTimeStamp: null,
  memories: {},
  pending: {},
  phoneNumber: null,
  profilePicUrl: GuestPic,
  received: 0,
  story: {},
  sent: 0,
  streakEmoji: '\u{1F525}',
  username: 'jonny_appleseed123',
};

export const Morty = {
  addedMe: {},
  brokeup: {},
  created: newDate,
  deleteSnaps: {},
  email: 'Morty@Guest.com',
  faceIDURL: null,
  firstName: 'Morty',
  friends: {},
  id: mortyID,
  lastName: 'Smith',
  loggedOffTimeStamp: null,
  memories: {},
  pending: {},
  phoneNumber: null,
  profilePicUrl: MortyPic,
  received: 0,
  story: {},
  sent: 0,
  streakEmoji: '\u{1F525}',
  username: 'aw-jeez123',
};

export const Rick = {
  addedMe: {},
  brokeup: {},
  created: newDate,
  deleteSnaps: {},
  email: 'Rick@Guest.com',
  faceIDURL: null,
  friends: {},
  firstName: 'Rick',
  id: rickID,
  lastName: 'Sanchez',
  loggedOffTimeStamp: null,
  memories: {},
  pending: {},
  phoneNumber: null,
  profilePicUrl: RickPic,
  received: 0,
  story: {},
  sent: 0,
  streakEmoji: '\u{1F525}',
  username: 'Rick-C-137',
};

export const Everyone = {
  [guestID]: {
    created: Guest['created'],
    email: Guest['email'],
    firstName: Guest['firstName'],
    id: Guest['id'],
    lastName: Guest['lastName'],
    lastTimeStamp: Guest['lastTimeStamp'],
    messages: Guest['messages'],
    phoneNumber: Guest['phoneNumber'],
    profilePicUrl: Guest['profilePicUrl'],
    username: Guest['username'],
  },
  [mortyID]: {
    created: Morty['created'],
    email: Morty['email'],
    firstName: Morty['firstName'],
    id: Morty['id'],
    lastName: Morty['lastName'],
    lastTimeStamp: Morty['lastTimeStamp'],
    messages: Morty['messages'],
    phoneNumber: Morty['phoneNumber'],
    profilePicUrl: Morty['profilePicUrl'],
    username: Morty['username'],
  },
  [rickID]: {
    created: Rick['created'],
    email: Rick['email'],
    firstName: Morty['firstName'],
    id: Rick['id'],
    lastName: Morty['lastName'],
    lastTimeStamp: Rick['lastTimeStamp'],
    messages: Rick['messages'],
    phoneNumber: Rick['phoneNumber'],
    profilePicUrl: Rick['profilePicUrl'],
    username: Rick['username'],
  },
};

export const FakeDB = {
  [guestID]: Guest,
};
