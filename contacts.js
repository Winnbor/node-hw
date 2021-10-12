const fs = require("fs").promises;

const path = require("path");

const contactsPath = path.join(
  path.dirname("db/contacts.json"),
  path.basename("db/contacts.json")
);

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    console.table(JSON.parse(data.toString()));
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);

    const structuredData = JSON.parse(data.toString());

    const contact = structuredData.find((el) => {
      return el.id === contactId;
    });

    console.table(contact);
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);

    const structuredData = JSON.parse(data.toString());

    const newId = structuredData.length + 1;
    const newContact = { id: newId, name, email, phone };

    structuredData.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(structuredData, null, 2));

    console.table(newContact);
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);

    const structuredData = JSON.parse(data.toString());

    const newData = structuredData.filter((el) => {
      return el.id !== contactId;
    });

    fs.writeFile(contactsPath, JSON.stringify(newData, null, 2));

    console.table(newData);
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
