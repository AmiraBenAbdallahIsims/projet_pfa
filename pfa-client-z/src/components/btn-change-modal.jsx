import React, { useState } from "react";

const ChangeModal = () => {
  console.log('ahla')
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const validateTitle = (event) => {
    const regex = /^[A-Za-z0-9_ ]*$/;
    if (!regex.test(event.target.value)) {
      event.target.setCustomValidity("Title can only contain letters, numbers, and the character _");
    } else {
      event.target.setCustomValidity("");
    }
  };

  const handleSaveChanges = () => {
    // Implement your save logic here, e.g., form validation or API call
    const titleInput = document.getElementById("contentTitle");
    if (titleInput.checkValidity()) {
      alert("Changes saved successfully!");
    } else {
      alert("Please correct the title before saving.");
    }
  };

  

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered custom-modal-size">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Let's get changed!
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* Tab navigation */}
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link active"
                  id="nav-content-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-content"
                  type="button"
                  role="tab"
                  aria-controls="nav-content"
                  aria-selected="true"
                >
                  Content
                </button>
                <button
                  className="nav-link"
                  id="nav-action-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-action"
                  type="button"
                  role="tab"
                  aria-controls="nav-action"
                  aria-selected="false"
                >
                  Action
                </button>
                <button
                  className="nav-link"
                  id="nav-design-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-design"
                  type="button"
                  role="tab"
                  aria-controls="nav-design"
                  aria-selected="false"
                >
                  Design
                </button>
              </div>
            </nav>

            {/* Tab content */}
            <div className="tab-content" id="nav-tabContent">
              {/* Content tab content */}
              <div
                className="tab-pane fade show active"
                id="nav-content"
                role="tabpanel"
                aria-labelledby="nav-content-tab"
              >
                <h6 className="modal-subtitle">Link text</h6>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="contentTitle"
                    placeholder="Title"
                    required
                    pattern="^[A-Za-z0-9_ ]*$"
                    onInput={validateTitle}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    id="contentSubtitle"
                    rows="2"
                    placeholder="Subtitle"
                  />
                </div>
              </div>

              {/* Action tab content */}
              <div
                className="tab-pane fade"
                id="nav-action"
                role="tabpanel"
                aria-labelledby="nav-action-tab"
              >
                <h6 className="modal-subtitle">Action</h6>
                <div className="mb-3">
                  <select
                    className="form-select"
                    id="selectAction"
                    aria-label="Select Action"
                  >
                    <option value="website">Website</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <h6 className="modal-subtitle">Link</h6>
                <input
                  className="form-control"
                  id="contentLink"
                  rows="2"
                  placeholder="Link"
                />
              </div>

              {/* Design tab content */}
              <div
                className="tab-pane fade"
                id="nav-design"
                role="tabpanel"
                aria-labelledby="nav-design-tab"
              >
                <p>This is the Design tab content.</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveChanges}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeModal;
