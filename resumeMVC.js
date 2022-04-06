const sectionConfig = {
  headingSectionForm: {
    sectionClassName: "headingEntry",
    name: "Heading Section",
    sectionDomLocationId: "headingSectionForm",
    heads: ["Name", "Collage", "Email", "DOB", "Address"],
  },
  educationSectionForm: {
    sectionClassName: "educationEntry",
    sectionDomLocationId: "educationSectionForm",
    heads: ["Degree", "Institute", "Year", "CPI"],
    classAttributesForNewFields: [
      "degree bold",
      "university",
      "year",
      "aggregate",
    ],
    name: "Education",
  },
  skillsSectionForm: {
    sectionClassName: "skillsEntry",
    sectionDomLocationId: "skillsSectionForm",
    heads: ["Scope", "Skills"],
    classAttributesForNewFields: ["skillTitle", "skillInfo"],
    name: "Skills",
  },
  internshipSectionForm: {
    sectionClassName: "internshipEntry",
    sectionDomLocationId: "internshipSectionForm",
    heads: ["Name", "Type", "Description", "Guide", "Timeline", "TeamSize"],
    classAttributesForNewFields: [
      "internshipAndProjectEntry internshipEntry",
      "internshipAndProjectTitle bold fullWidth",
      "fullWidth",
      "fullWidth",
      "internshipAndProjectInfo fullWidth",
      "fullWidth",
      "fullWidth",
      "internshipAndProjectPeriodAndTeam fullWidth",
      "fullWidth",
      "fullWidth",
    ],
    name: "Internships",
  },
  projectSectionForm: {
    sectionClassName: "projectEntry",
    sectionDomLocationId: "projectSectionForm",
    heads: ["Name", "Guide", "Description", "Link", "Timeline", "TeamSize"],
    classAttributesForNewFields: [
      "internshipAndProjectEntry projectEntry",
      "internshipAndProjectTitle fullWidth",
      "fullWidth bold",
      "fullWidth",
      "internshipAndProjectInfo fullWidth",
      "fullWidth",
      "fullWidth",
      "internshipAndProjectPeriodAndTeam fullWidth",
      "fullWidth",
      "fullWidth",
    ],
    name: "Projects",
  },
  responsibilitySectionForm: {
    sectionClassName: "responsibilityEntry",
    sectionDomLocationId: "responsibilitySectionForm",
    name: "Responsibilities",
  },
  hobbySectionForm: {
    sectionClassName: "hobbyEntry",
    sectionDomLocationId: "hobbySectionForm",
    name: "Interests and Hobbies",
  },
  awardSectionForm: {
    sectionClassName: "awardEntry",
    sectionDomLocationId: "awardSectionForm",
    classAttributesForNewFields: [
      "head1 marginBottomMinus awardEntry",
      "childDetail awardEntry",
    ],
    name: "Awards and Achievements",
  },
};

//FormView Helper Functions
function emptySectionsInResumeView() {
  for (let section in sectionConfig) {
    document
      .querySelectorAll(`.${sectionConfig[section].sectionClassName}`)
      .forEach((e) => e.remove());
  }
}

function createElement(tag, className, content) {
  const element = document.createElement(tag);
  if (className) element.setAttribute("class", className);
  if (content) element.innerHTML = content;

  return element;
}

function getElement(selector, all) {
  if (all) return document.querySelectorAll(selector);
  return document.querySelector(selector);
}

function createSectionRef(divId, formViewRef) {
  let temp = divId;
  formViewRef[divId] = createElement(
    "div",
    "resumeFormRowForSections fullWidth"
  );
  formViewRef[divId].id = temp;

  return formViewRef[divId];
}

function getApplyAndResetButtonsDiv(formViewRef) {
  formViewRef.applyAndResetBtnsDiv = createElement(
    "div",
    "applyAndResetBtns fullWidth"
  );
  formViewRef.resetBtn = createElement("button", "resetBtn");
  formViewRef.resetBtn.innerHTML = "Reset";
  formViewRef.resetBtn.type = "button";

  formViewRef.applyBtn = createElement("button", "applyBtn");
  formViewRef.applyBtn.innerHTML = "Apply";
  formViewRef.applyBtn.type = "button";
  formViewRef.applyAndResetBtnsDiv.append(
    formViewRef.resetBtn,
    formViewRef.applyBtn
  );

  return formViewRef.applyAndResetBtnsDiv;
}

function getInputField(contentForNewLabel, inputFieldValue) {
  let resumeFormRowDiv = createElement("div", "resumeFormRow fullWidth");
  let newLabel = createElement("label", "resumeFormLabels", contentForNewLabel);
  let newInputField = createElement("input", "resumeFormInputField");
  newInputField.placeholder = "Enter Here";
  newInputField.value = inputFieldValue;
  newInputField.required = true;

  if (contentForNewLabel === "") {
    newLabel.style.display = "none";
    newInputField.style.width = "75%";
  }

  resumeFormRowDiv.append(newLabel, newInputField);
  return resumeFormRowDiv;
}

function getInputFieldsForEntry(entryDetails) {
  let entryDiv = createElement("div", "entryDiv");
  entryDiv.id = entryDetails.entryDivId;
  let entryCancelButton = createElement("button", "entryCancelButton", "x");
  entryCancelButton.type = "button";
  if (entryDetails.sectionRef !== "headingSectionForm")
    entryDiv.append(entryCancelButton);

  if (entryDetails.entryContent === "") {
    if (!sectionConfig[entryDetails.sectionRef].heads) {
      entryDiv.append(getInputField("", ""));
    }

    sectionConfig[entryDetails.sectionRef]?.heads?.forEach((labelName, idx) => {
      entryDiv.append(getInputField(labelName, ""));
    });
    entryDiv.append(getApplyAndResetButtonsDiv(entryDetails.formViewRef));
    return entryDiv;
  }

  entryDetails.entryContent.forEach((field, idx) => {
    const headsIndexToBeChosen =
      entryDetails.sectionRef === "headingSectionForm"
        ? entryDetails.entryIndex
        : idx;

    const labelContent = sectionConfig[entryDetails.sectionRef].heads
      ? sectionConfig[entryDetails.sectionRef].heads[headsIndexToBeChosen]
      : "";

    entryDiv.append(getInputField(labelContent, field));
  });

  entryDiv.append(getApplyAndResetButtonsDiv(entryDetails.formViewRef));
  return entryDiv;
}

//ResumeView Helper Functions
function getEntriesForHeadingSection(entries, resumeViewRef) {
  let sectionEntryList = entries.headingSectionForm;

  const containerDiv = createElement("div", "right headingEntry fullWidth");

  let nameDiv = createElement(
    "div",
    "bold name fullWidth",
    sectionEntryList[0].content
  );
  nameDiv.id = "headingSecElementOnRight1";
  let clgDiv = createElement(
    "div",
    "bold clg fullWidth",
    sectionEntryList[1].content
  );
  clgDiv.id = "headingSecElementOnRight2";

  let headParr = createElement("div", "emailDobContainer fullWidth");

  let headParrChildLeft = createElement("div", "leftChildContainer");
  let spanForBold = createElement("span", "bold", "Email");
  let aTag = createElement("a");
  aTag.href = `mailto:${sectionEntryList[2].content}`;
  aTag.id = "headingSecElementOnRight3";
  aTag.innerHTML = sectionEntryList[2].content;
  headParrChildLeft.append(spanForBold, ": ", aTag);

  let headParrChildRight = createElement("div", "rightChildContainer");
  spanForBold = createElement("span", "bold", "DOB");
  let spanEle = createElement("span");
  spanEle.id = "headingSecElementOnRight4";
  spanEle.innerHTML = sectionEntryList[3].content;
  headParrChildRight.append(spanForBold, ": ", spanEle);

  headParr.append(headParrChildLeft, headParrChildRight);

  let addDiv = createElement("div", "add fullWidth");
  spanForBold = createElement("span", "bold", "Address");
  aTag = createElement("a");
  aTag.href = "https://goo.gl/maps/Pqpw1ik6q6NmGoHe7";
  aTag.id = "headingSecElementOnRight5";
  aTag.innerHTML = sectionEntryList[4].content;
  aTag.target = "_blank";
  addDiv.append(spanForBold, ": ", aTag);

  containerDiv.append(nameDiv, clgDiv, headParr, addDiv);

  return containerDiv;
}

function getEntryForNonCascadedSections(sectionRef, entryContent, entryIdx) {
  const parDiv = createElement(
    "div",
    `${sectionConfig[sectionRef].sectionClassName} fullWidth`
  );
  entryContent.forEach((field, idx) => {
    const childDiv = createElement(
      "div",
      sectionConfig[sectionRef].classAttributesForNewFields[
        sectionRef === "awardSectionForm" ? (entryIdx > 0 ? 1 : 0) : idx
      ],
      field
    );
    parDiv.append(childDiv);
  });
  return parDiv;
}

function getSemiParDivs(count, count1, sectionRef, entryContent) {
  let semiParDiv = createElement(
    "div",
    sectionConfig[sectionRef].classAttributesForNewFields[count++]
  );
  let childDiv1 = createElement(
    "div",
    sectionConfig[sectionRef].classAttributesForNewFields[count++],
    entryContent[count1++]
  );
  let childDiv2 = createElement(
    "div",
    sectionConfig[sectionRef].classAttributesForNewFields[count++],
    entryContent[count1++]
  );
  semiParDiv.append(childDiv1, childDiv2);
  return semiParDiv;
}

function getEntryForCascadedSections(sectionRef, entryContent) {
  const parDiv = createElement(
    "div",
    `${sectionConfig[sectionRef].classAttributesForNewFields[0]} fullWidth`
  );

  parDiv.append(
    getSemiParDivs(1, 0, sectionRef, entryContent),
    getSemiParDivs(4, 2, sectionRef, entryContent),
    getSemiParDivs(7, 4, sectionRef, entryContent)
  );
  return parDiv;
}

function getEntryForBulletLists(sectionRef, entryContent) {
  const liDiv = createElement(
    "li",
    `childDetail marginBottom ${sectionConfig[sectionRef].sectionClassName} fullWidth`
  );
  liDiv.innerHTML = entryContent;
  return liDiv;
}

function createHeadingSection(resumeViewRef) {
  resumeViewRef.header = createElement("div", "header fullWidth");
  let headerP = createElement("p");
  headerP.id = "headerDate";
  headerP.innerHTML = "7/16/2021";
  resumeViewRef.header.append(headerP);
  headerP = createElement("p");
  headerP.id = "headerTitle";
  headerP.innerHTML = "201801046_Resume";
  resumeViewRef.header.append(headerP);

  resumeViewRef.headerSectionInResume = createElement("div", "row fullWidth");
  resumeViewRef.headerSectionInResume.classList.add("borderBottom1");
  const blackLineDiv = createElement("div", "blackLine");
  const remainingHeadDiv = createElement("div", "remainingHead");

  const leftDiv = createElement("div", "left");
  const leftDivImg = createElement("img");
  leftDivImg.src =
    "https://upload.wikimedia.org/wikipedia/en/b/b1/Dhirubhai_Ambani_Institute_of_Information_and_Communication_Technology_logo.png";
  leftDivImg.alt = "DAIICT LOGO";
  leftDiv.append(leftDivImg);

  resumeViewRef.headingEntryList = createElement(
    "div",
    "headingEntryListContainer"
  );
  remainingHeadDiv.append(leftDiv, resumeViewRef.headingEntryList);
  resumeViewRef.headerSectionInResume.append(blackLineDiv, remainingHeadDiv);
  resumeViewRef.resume.append(
    resumeViewRef.header,
    resumeViewRef.headerSectionInResume
  );
}

function createEducationEntryList(resumeViewRef) {
  const rowDiv = createElement("div", "row fullWidth");
  const blackLineDiv = createElement("div", "blackLine");
  resumeViewRef.educationEntryList = createElement("div", "remaining");
  const sectionHead = createElement("div", "head1", "EDUCATION");
  resumeViewRef.educationEntryList.append(sectionHead);
  rowDiv.append(blackLineDiv, resumeViewRef.educationEntryList);
  resumeViewRef.resume.append(rowDiv);
}

function createSkillsEntryList(resumeViewRef) {
  const rowDiv = createElement("div", "row fullWidth");
  const blackLineDiv = createElement("div", "blackLine");
  resumeViewRef.skillsEntryList = createElement("div", "remaining");
  const sectionHead = createElement("div", "head1", "SKILLS");
  resumeViewRef.skillsEntryList.append(sectionHead);
  rowDiv.append(blackLineDiv, resumeViewRef.skillsEntryList);
  resumeViewRef.resume.append(rowDiv);
}

function createInternshipEntryList(resumeViewRef) {
  const rowDiv = createElement("div", "row fullWidth");
  const blackLineDiv = createElement("div", "blackLine");
  resumeViewRef.internshipEntryList = createElement("div", "remaining");
  const sectionHead = createElement(
    "div",
    "head1",
    "PROFESSIONAL EXPERIENCE/INTERNSHIPS"
  );
  resumeViewRef.internshipEntryList.append(sectionHead);
  rowDiv.append(blackLineDiv, resumeViewRef.internshipEntryList);
  resumeViewRef.resume.append(rowDiv);
}

function createProjectEntryList(resumeViewRef) {
  const rowDiv = createElement("div", "row fullWidth");
  const blackLineDiv = createElement("div", "blackLine");
  resumeViewRef.projectEntryList = createElement("div", "remaining");
  const sectionHead = createElement("div", "head1", "PROJECTS");
  resumeViewRef.projectEntryList.append(sectionHead);
  rowDiv.append(blackLineDiv, resumeViewRef.projectEntryList);
  resumeViewRef.resume.append(rowDiv);
}

function getResponsibilityAndHobbyEntryLists(resumeViewRef) {
  let horiPart = createElement("div", "horiPart fullWidth");
  const responsibilitySectionContainer = createElement(
    "div",
    "leftChildContainer"
  );
  let headVar1 = createElement("div", "head1");
  headVar1.classList.add("zeroMargin");
  headVar1.innerHTML = "POSITIONS OF";
  let headVar2 = createElement("div", "head1");
  headVar2.classList.add("marginBottomMinus");
  headVar2.innerHTML = "RESPONSIBILITY";
  resumeViewRef.responsibilityEntryList = createElement(
    "ul",
    "childDetail fullWidth"
  );
  responsibilitySectionContainer.append(
    headVar1,
    headVar2,
    resumeViewRef.responsibilityEntryList
  );

  const hobbySectionContainer = createElement("div", "rightChildContainer");
  headVar1 = createElement("div", "head1");
  headVar1.classList.add("marginBottomMinus");
  headVar1.innerHTML = "INTERESTS AND HOBBIES";
  resumeViewRef.hobbyEntryList = createElement("ul", "childDetail fullWidth");
  resumeViewRef.hobbyEntryList.classList.add("marginBottom");
  hobbySectionContainer.append(headVar1, resumeViewRef.hobbyEntryList);

  horiPart.append(responsibilitySectionContainer, hobbySectionContainer);

  return horiPart;
}

const headingSectionFormConfig = [
  {
    id: `headingSectionForm${1}`,
    content: ["Ravi Patel"],
  },
  {
    id: `headingSectionForm${2}`,
    content: [
      "Dhirubhai Ambani Institute of Information and Communication Technology",
    ],
  },
  {
    id: `headingSectionForm${3}`,
    content: ["201801046@daiict.ac.in"],
  },
  {
    id: `headingSectionForm${4}`,
    content: ["September 29, 2000"],
  },
  {
    id: `headingSectionForm${5}`,
    content: ["A-308, HoR Men, DA-IICT, Gandhinagar"],
  },
];
const educationSectionFormConfig = [
  {
    id: `educationSectionForm${1}`,
    content: ["Degree", "Institute", "Year", "CPI"],
    isHeading: true,
  },
  {
    id: `educationSectionForm${2}`,
    content: [
      "B.Tech | ICT",
      "Dhirubhai Ambani Institute of Information and Communication Technology",
      "2022",
      "7.8",
    ],
  },
  {
    id: `educationSectionForm${3}`,
    content: [
      "Higher Secondary | Class XII",
      "H.B. Kapadiya High School, Memnagar, Ahmedabad",
      "2018",
      "85%",
    ],
  },
  {
    id: `educationSectionForm${4}`,
    content: [
      "Secondary | Class X",
      "H.B. Kapadiya High School, Memnagar, Ahmedabad",
      "2016",
      "95%",
    ],
  },
];
const skillsSectionFormConfig = [
  {
    id: `skillsSectionForm${1}`,
    content: [
      "Expertise Area/Area(s) of Interest",
      "Data Structures and Algorithms",
    ],
  },
  {
    id: `skillsSectionForm${2}`,
    content: ["Programming Language(s)", "C, C++, PostgreSQL"],
  },
  {
    id: `skillsSectionForm${3}`,
    content: ["Tools and Technologies", "Dev c++, React, LT-Spice"],
  },
  {
    id: `skillsSectionForm${4}`,
    content: [
      "Technical Electives",
      "Operating System, Database Management System, Data Structures, Design and Analysis of Algorithms",
    ],
  },
];
const internshipSectionFormConfig = [
  {
    id: `internshipSectionForm${1}`,
    content: [
      "YUVA Unstoppable NGO, Ahmedabad, Gujarat",
      "(Rural Internship)",
      "Used to visit 3-4 primary schools and teach students there. Organised events and competitions in different schools with the 'Chhalaang' organisation.",
      "Guide: Prof. Alka Parikh, Prof. Kalyan Shashidhar",
      "Dec 5 2019- Dec 31 2019",
      "Team Size - 7",
    ],
  },
];
const projectSectionFormConfig = [
  {
    id: `projectSectionForm${1}`,
    content: [
      "Car Rental Database System",
      "Guide: Prof. P.M. Jat",
      "Created a Car Rental Database that covers the data of users, employees, booking history, car rates, payment methods, etc. Normalization has been implemented for the database upto some extent to make responses of queries faster.",
      "",
      "Sept 2020 - Nov 2020",
      "Team Size - 4",
    ],
  },
  {
    id: `projectSectionForm${2}`,
    content: [
      "Student Community Web Application",
      "Guide: Prof. Jayprakash Lalchandani",
      "Student Community is a social platform exclusively designed for the DA- IICT community. It contains features like a chat application, posts, polling, suggestions, profile, club coordination, etc.",
      "(Link : da-student-connect.web.app)",
      "Sept 2020 - Feb 2020",
      "Team Size - 3",
    ],
  },
  {
    id: `projectSectionForm${3}`,
    content: [
      "Time Break Desktop(Native) Application",
      "Guide: Saurabh Tiwari",
      "Time for a Break is a desktop application that sends reminders at regular intervals to the user to take a short break and relax. It's been build with an electron framework; contains functionalities like schedule, settings, notification, timer, report, etc.",
      "",
      "Feb 2020 - May 2020",
      "Team Size - 10",
    ],
  },
];
const responsibilitySectionFormConfig = [
  {
    id: `responsibilitySectionForm${1}`,
    content: [
      "Core committee member of radio Club Daiict (June 2020 - present)",
    ],
  },
  {
    id: `responsibilitySectionForm${2}`,
    content: ["Coordinator at Synapse 2020 (Event management) (Feb 2020)"],
  },
];
const hobbySectionFormConfig = [
  {
    id: `hobbySectionForm${1}`,
    content: ["Competitive Programming"],
  },
  {
    id: `hobbySectionForm${2}`,
    content: ["Reading novels, fictional books, autobiographies"],
  },
  {
    id: `hobbySectionForm${3}`,
    content: ["Badminton, carrom, drawing, meditation"],
  },
  {
    id: `hobbySectionForm${4}`,
    content: ["Having a dream of World-tour"],
  },
];
const awardSectionFormConfig = [
  {
    id: `awardSectionForm${1}`,
    content: ["AWARDS AND ACHIEVEMENTS"],
    isHeading: true,
  },
  {
    id: `awardSectionForm${2}`,
    content: ["Was awarded MYSY scholarship in first 2 years of college"],
  },
  {
    id: `awardSectionForm${3}`,
    content: ["Codeforces Max Rating: 1593"],
  },
  {
    id: `awardSectionForm${4}`,
    content: ["Got 2nd place in Winter Of Code(WOC 2021) in Android Dev"],
  },
];

class Model {
  constructor() {
    this.entries = {
      headingSectionForm: headingSectionFormConfig,
      educationSectionForm: educationSectionFormConfig,
      skillsSectionForm: skillsSectionFormConfig,
      internshipSectionForm: internshipSectionFormConfig,
      projectSectionForm: projectSectionFormConfig,
      responsibilitySectionForm: responsibilitySectionFormConfig,
      hobbySectionForm: hobbySectionFormConfig,
      awardSectionForm: awardSectionFormConfig,
    };
  }

  addEntry(sectionClassName, content) {
    const sectionEntryList = this.entries[sectionClassName];
    const newIdIterator = parseInt(sectionEntryList.at(-1).id.slice(-1)) + 1;
    const entry = {
      id: `${sectionClassName}${newIdIterator}`,
      content: content,
    };

    this.entries[sectionClassName].push(entry);
  }

  deleteEntry(sectionClassName, id) {
    this.entries[sectionClassName] = this.entries[sectionClassName].filter(
      (entry) => entry.id !== id
    );
  }

  editEntry(sectionClassName, id, updatedcontent) {
    this.entries[sectionClassName] = this.entries[sectionClassName].map(
      (entry) => {
        return entry.id === id
          ? { id: entry.id, content: updatedcontent }
          : entry;
      }
    );
  }
}

class FormView {
  constructor() {
    this.resumeForm = createElement("div", "resumeForm");
    this.currentSectionDisplayedName = "";

    this.formHead = createElement("h1", "resumeFormHeading fullWidth");
    this.formHead.textContent = "Resume Generator";

    this.selectDropdownContainer = createElement(
      "div",
      "selectDropdownContainer fullWidth"
    );
    this.selectDropdown = createElement("select");
    this.selectDropdown.id = "selectDropdown";
    this.selectDropdown.addEventListener("change", () => {
      this.onSelectChange();
    });

    let option = createElement("option", "optionDropdown");
    option.innerHTML = "Select a View to Alter";
    option.value = "";
    this.selectDropdown.append(option);

    for (let section in sectionConfig) {
      section = sectionConfig[section];
      option = createElement("option", "optionDropdown");
      option.innerHTML = section.name;
      option.value = section.sectionDomLocationId;

      this.selectDropdown.append(option);
    }

    this.selectDropdownContainer.append(this.selectDropdown);

    this.sectionForm = createElement("form", "fullWidth");
    this.sectionForm.action = "";
    this.sectionForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    this.sectionForm.append(
      createSectionRef("headingSectionForm", this),
      createSectionRef("educationSectionForm", this),
      createSectionRef("skillsSectionForm", this),
      createSectionRef("internshipSectionForm", this),
      createSectionRef("projectSectionForm", this),
      createSectionRef("awardSectionForm", this),
      createSectionRef("responsibilitySectionForm", this),
      createSectionRef("hobbySectionForm", this)
    );

    this.addBtnDiv = createElement("div", "fullWidth");
    this.addBtnDiv.id = "addNewEntryButton";
    this.addBtn = createElement("button");
    this.addBtn.id = "addNewEntryBtnId";
    this.addBtn.innerHTML = "Add";
    this.addBtn.type = "button";
    this.addBtnDiv.append(this.addBtn);

    this.sectionForm.append(this.addBtnDiv);

    this.resumeForm.append(
      this.formHead,
      this.selectDropdownContainer,
      this.headingSectionForm,
      this.sectionForm
    );

    return this;
  }

  onSelectChange() {
    const selectedValue = this.selectDropdown.value;

    const currentSectionDisplayed = this[this.currentSectionDisplayedName];
    currentSectionDisplayed?.parentElement.removeChild(currentSectionDisplayed);

    this.handleChangeInSelectDropDown(selectedValue);
    this.currentSectionDisplayedName = selectedValue;

    this.addBtnDiv.style.display = "flex";
    this.applyAndResetBtnsDiv.style.display = "flex";

    if (selectedValue === "" || selectedValue === "headingSectionForm") {
      this.addBtnDiv.style.display = "none";
      return;
    }
  }

  handleReset(entries) {
    const resetButtons = document.getElementsByClassName("resetBtn");

    for (let resetButton of resetButtons) {
      resetButton.addEventListener("click", (e) => {
        const selectedValue = this.selectDropdown.value;
        const parentEntryDiv = document.getElementById(
          e.target.parentNode.parentNode.id
        );
        let originalValues = [];

        entries[selectedValue].forEach((entry) => {
          if (entry.id === parentEntryDiv.id) {
            originalValues = entry.content;
          }
        });

        parentEntryDiv.querySelectorAll("input").forEach((field, idx) => {
          field.value = originalValues[idx];
        });
      });
    }
  }

  handleApply(handler, entries, onActionComplete) {
    const applyButtons = document.getElementsByClassName("applyBtn");

    for (let applyButton of applyButtons) {
      applyButton.addEventListener("click", (e) => {
        const selectedValue = this.selectDropdown.value;
        const parentEntryDiv = document.getElementById(
          e.target.parentNode.parentNode.id
        );
        let originalValues = [];

        parentEntryDiv.querySelectorAll("input").forEach((field, idx) => {
          originalValues.push(field.value);
        });

        handler(selectedValue, parentEntryDiv.id, originalValues);
        emptySectionsInResumeView();
        onActionComplete(entries);
      });
    }
  }

  handleDeleteEntry(handler, entries, onActionComplete) {
    let selectedValue;
    const removeButtons = document.getElementsByClassName("entryCancelButton");
    for (let currRemoveBtn of removeButtons) {
      currRemoveBtn.addEventListener("click", (event) => {
        selectedValue = this.selectDropdown.value;
        document.getElementById(event.target.parentNode.id).remove();
        handler(selectedValue, event.target.parentNode.id);

        this.addBtn.textContent = "Add";
        emptySectionsInResumeView();
        onActionComplete(entries);
      });
    }
  }

  handleAddEntry(args) {
    this.addBtn.addEventListener("click", () => {
      let selectedValue = this.selectDropdown.value;

      if (this.addBtn.textContent === "Add") {
        this.addBtn.textContent = "Confirm";
        const newIterator =
          parseInt(this[selectedValue].lastChild.id.slice(-1)) + 1;
        const newId = `${selectedValue}${newIterator}`;
        this[selectedValue].append(
          getInputFieldsForEntry({
            sectionRef: selectedValue,
            entryContent: "",
            entryDivId: newId,
            formViewRef: this,
          })
        );
        this.handleDeleteEntry(
          args.handlerForDelete,
          args.entries,
          args.onActionComplete
        );
        this.handleApply(
          args.handlerForApply,
          args.entries,
          args.onActionComplete
        );
      } else {
        this.addBtn.textContent = "Add";
        const newlyAddedEntryDiv = this[selectedValue].lastChild;
        const newValues = [];
        newlyAddedEntryDiv.querySelectorAll("input").forEach((field) => {
          newValues.push(field.value);
        });

        args.handler(selectedValue, newValues);
        this.handleReset(args.entries);
        emptySectionsInResumeView();
        args.onActionComplete(args.entries);
      }
    });
  }

  getFormForSection(entries, section) {
    let heading = createElement(
      "h2",
      "sectionHeading fullWidth",
      sectionConfig[section].name
    );
    this[section].append(heading);

    let sectionEntryList = entries[section];
    sectionEntryList.map((entry, entryIndex) => {
      if (entry?.isHeading) return;

      this[section].append(
        getInputFieldsForEntry({
          sectionRef: section,
          entryContent: entry.content,
          entryDivId: entry.id,
          formViewRef: this,
          entryIndex,
        })
      );
    });
  }
}

class ResumeView {
  constructor() {
    this.resumeView = createElement("div", "resumeView");

    this.box = createElement("div", "box fullWidth");
    this.resume = createElement("div", "resume");

    createHeadingSection(this);
    createEducationEntryList(this);
    createSkillsEntryList(this);
    createInternshipEntryList(this);
    createProjectEntryList(this);

    let rowDiv = createElement("div", "row fullWidth");
    let blackLineDiv = createElement("div", "blackLine");
    let remainingDiv = createElement("div", "remaining fullWidth");

    let vertiPart = createElement("div", "vertiPart fullWidth");
    this.awardEntryList = createElement(
      "div",
      "awardEntriesContainer lastSection fullWidth"
    );
    vertiPart.append(
      getResponsibilityAndHobbyEntryLists(this),
      this.awardEntryList
    );
    remainingDiv.append(vertiPart);
    rowDiv.append(blackLineDiv, remainingDiv);
    this.resume.append(rowDiv);
    this.box.append(this.resume);
    this.resumeView.append(this.box);

    return this;
  }

  displaySectionEntries(entries) {
    this.headingEntryList.append(getEntriesForHeadingSection(entries, this));
    let sectionEntryList = entries.educationSectionForm;
    sectionEntryList.map((entry) => {
      this.educationEntryList.append(
        getEntryForNonCascadedSections("educationSectionForm", entry.content)
      );
    });
    sectionEntryList = entries.skillsSectionForm;
    sectionEntryList.map((entry) => {
      this.skillsEntryList.append(
        getEntryForNonCascadedSections("skillsSectionForm", entry.content)
      );
    });
    sectionEntryList = entries.awardSectionForm;
    sectionEntryList.forEach((entry, idx) => {
      this.awardEntryList.append(
        getEntryForNonCascadedSections("awardSectionForm", entry.content, idx)
      );
    });
    sectionEntryList = entries.internshipSectionForm;
    sectionEntryList.forEach((entry, idx) => {
      this.internshipEntryList.append(
        getEntryForCascadedSections("internshipSectionForm", entry.content)
      );
    });
    sectionEntryList = entries.projectSectionForm;
    sectionEntryList.forEach((entry, idx) => {
      this.projectEntryList.append(
        getEntryForCascadedSections("projectSectionForm", entry.content)
      );
    });
    sectionEntryList = entries.responsibilitySectionForm;
    sectionEntryList.forEach((entry, idx) => {
      this.responsibilityEntryList.append(
        getEntryForBulletLists("responsibilitySectionForm", entry.content)
      );
    });
    sectionEntryList = entries.hobbySectionForm;
    sectionEntryList.forEach((entry, idx) => {
      this.hobbyEntryList.append(
        getEntryForBulletLists("hobbySectionForm", entry.content)
      );
    });
  }
}

class View {
  constructor() {
    this.formView = new FormView();
    this.resumeView = new ResumeView();

    this.app = document.getElementsByClassName("container")[0];
    this.app.append(this.formView.resumeForm, this.resumeView.resumeView);
  }

  initialize(args) {
    this.resumeView.displaySectionEntries(args.entries);

    this.formView.handleChangeInSelectDropDown = (section) => {
      this.formView.getFormForSection(args.entries, section);
      this.formView.handleReset(args.entries);
      this.formView.handleApply(
        args.handleEdit,
        args.entries,
        this.handleDisplayOfEntriesInResumeView
      );
      this.formView.handleDeleteEntry(
        args.handleDelete,
        args.entries,
        this.handleDisplayOfEntriesInResumeView
      );
      this.formView.handleAddEntry({
        handler: args.handleAdd,
        entries: args.entries,
        handlerForDelete: args.handleDelete,
        handlerForApply: args.handleEdit,
        onActionComplete: this.handleDisplayOfEntriesInResumeView,
      });
    };
  }

  handleDisplayOfEntriesInResumeView = (entries) => {
    this.resumeView.displaySectionEntries(entries);
  };
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.initialize({
      entries: this.model.entries,
      handleDelete: this.handleDelete,
      handleAdd: this.handleAdd,
      handleEdit: this.handleEdit,
    });
  }

  handleEdit = (sectionClassName, id, updatedcontent) => {
    this.model.editEntry(sectionClassName, id, updatedcontent);
  };

  handleDelete = (sectionClassName, id) => {
    this.model.deleteEntry(sectionClassName, id);
  };

  handleAdd = (sectionClassName, content) => {
    this.model.addEntry(sectionClassName, content);
  };
}

const resumeApp = new Controller(new Model(), new View());
