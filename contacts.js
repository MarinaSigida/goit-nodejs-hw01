const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const searchedId = contacts.find((contact) => contact.id === contactId);
  return searchedId || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const deletedIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (deletedIndex === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(deletedIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
