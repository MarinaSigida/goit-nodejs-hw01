const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    return error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const searchedId = contacts.find((contact) => contact.id === contactId);
    return searchedId || null;
  } catch (error) {
    return error;
  }
}

async function removeContact(contactId) {
  try {
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
  } catch (error) {
    return error;
  }
}

async function addContact(name, email, phone) {
  try {
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
  } catch (error) {
    return error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
