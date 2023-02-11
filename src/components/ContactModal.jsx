import { useRef, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useContacts } from "../context/ContactProvider";

const ContactModal = ({ show, handleClose, type, contact }) => {
  const [loading, setLoading] = useState(false);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const { addContact, setErrorMsg, editContact } = useContacts();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      if (
        !nameRef.current?.value ||
        !phoneRef.current?.value ||
        !addressRef.current?.value
      ) {
        setErrorMsg("Please fill in all the fields");
        return;
      }
      const contactToSave = {
        name: nameRef.current.value,
        phone: phoneRef.current.value,
        address: addressRef.current.value
      };
      if (type === "Edit") {
        await editContact(contactToSave, contact.id);
      } else {
        await addContact(contactToSave);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="text-center" closeButton>
        <h2>{type} Contact</h2>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Form.Group id="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={nameRef}
                  defaultValue={contact?.name ?? ""}
                  required
                  autoFocus
                />
              </Form.Group>
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  ref={phoneRef}
                  defaultValue={contact?.phone ?? ""}
                  required
                />
              </Form.Group>
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  ref={addressRef}
                  defaultValue={contact?.address ?? ""}
                  required
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button disabled={loading} variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ContactModal;
