const sectionConfig = {
  headingSectionForm: {
    name: "Heading Section",
    sectionDomLocationId: "headingSectionForm",
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
      "internshipAndProjectTitle bold",
      "internshipAndProjectTitleAdd",
      "internshipAndProjectTitleRural",
      "internshipAndProjectInfo",
      "internshipAndProjectInfoDetail",
      "internshipAndProjectInfoProff",
      "internshipAndProjectPeriodAndTeam",
      "internshipAndProjectPeriod",
      "internshipAndProjectTeam",
    ],
    name: "Internships",
  },
  projectSectionForm: {
    sectionClassName: "projectEntry",
    sectionDomLocationId: "projectSectionForm",
    heads: ["Name", "Guide", "Description", "Link", "Timeline", "TeamSize"],
    classAttributesForNewFields: [
      "internshipAndProjectEntry projectEntry",
      "internshipAndProjectTitle",
      "internshipAndProjectTitleAdd bold",
      "internshipAndProjectTitleRural",
      "internshipAndProjectInfo",
      "internshipAndProjectInfoDetail",
      "internshipAndProjectInfoProff",
      "internshipAndProjectPeriodAndTeam",
      "internshipAndProjectPeriod",
      "internshipAndProjectTeam",
    ],
    name: "Projects",
  },
  responsibilitySectionForm: {
    sectionClassName: "responsibilityEntry",
    sectionDomLocationId: "responsibilitySectionForm",
    name: "Responsibilities",
    heads: [""],
  },
  hobbySectionForm: {
    sectionClassName: "hobbyEntry",
    sectionDomLocationId: "hobbySectionForm",
    name: "Interests and Hobbies",
    heads: [""],
  },
  awardSectionForm: {
    sectionClassName: "awardEntry",
    sectionDomLocationId: "awardSectionForm",
    classAttributesForNewFields: [
      "head1 marginBottomMinus awardEntry",
      "childDetail awardEntry",
    ],
    name: "Awards and Achievements",
    heads: [""],
  },
};

//FormView Helper Functions
function getHeadingSectionRow(labelName, inputFieldId, inputFieldContent) {
  let resumeFormRow, resumeFormRowLabel, resumeFormRowInput;
  resumeFormRow = createElement("div", "resumeFormRow");
  resumeFormRowLabel = createElement("label", "resumeFormLabels", labelName);
  resumeFormRowInput = createElement("input", "resumeFormInputField");
  resumeFormRowInput.placeholder = "Enter Here";
  resumeFormRowInput.id = inputFieldId;
  resumeFormRowInput.required = true;
  resumeFormRowInput.value = inputFieldContent;
  resumeFormRow.append(resumeFormRowLabel, resumeFormRowInput);

  return resumeFormRow;
}

function emptySectionsInResumeView() {
  for (let section in sectionConfig) {
    if (section === "headingSectionForm") continue;

    // console.log(section);
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

function getFormSectionHeading(divId, name, formViewRef) {
  let temp = divId;
  formViewRef[divId] = createElement("div", "resumeFormRowForSections");
  formViewRef[divId].id = temp;
  let heading = createElement("h2", "sectionHeading", name);

  formViewRef[divId].append(heading);
  return formViewRef[divId];
}

function getApplyAndResetButtonsDiv(formViewRef) {
  formViewRef.applyAndResetBtnsDiv = createElement("div", "applyAndResetBtns");
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
  let resumeFormRowDiv = createElement("div", "resumeFormRow");
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

function getInputFieldsForEntry(
  sectionRef,
  entryContent,
  entryDivId,
  formViewRef
) {
  let entryDiv = createElement("div", "entryDiv");
  entryDiv.id = entryDivId;
  let entryCancelButton = createElement("button", "entryCancelButton", "x");
  entryCancelButton.type = "button";
  entryDiv.append(entryCancelButton);

  if (entryContent === "") {
    sectionConfig[sectionRef].heads.forEach((labelName, idx) => {
      entryDiv.append(getInputField(labelName, ""));
    });
    entryDiv.append(getApplyAndResetButtonsDiv(formViewRef));
    return entryDiv;
  }

  entryContent.forEach((field, idx) => {
    entryDiv.append(getInputField(sectionConfig[sectionRef].heads[idx], field));
  });

  entryDiv.append(getApplyAndResetButtonsDiv(formViewRef));
  return entryDiv;
}

//ResumeView Helper Functions
function getEntryForNonCascadedSections(sectionRef, entryContent, entryIdx) {
  const parDiv = createElement(
    "div",
    sectionConfig[sectionRef].sectionClassName
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
    sectionConfig[sectionRef].classAttributesForNewFields[0]
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
    `childDetail marginBottom ${sectionConfig[sectionRef].sectionClassName}`
  );
  liDiv.innerHTML = entryContent;
  return liDiv;
}

class Model {
  constructor() {
    this.entries = {
      educationSectionForm: [
        {
          id: `educationSectionForm${1}`,
          content: ["Degree", "Institute", "Year", "CPI"],
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
      ],
      skillsSectionForm: [
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
      ],
      internshipSectionForm: [
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
      ],
      projectSectionForm: [
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
      ],
      responsibilitySectionForm: [
        {
          id: `responsibilitySectionForm${1}`,
          content: [
            "Core committee member of radio Club Daiict (June 2020 - present)",
          ],
        },
        {
          id: `responsibilitySectionForm${2}`,
          content: [
            "Coordinator at Synapse 2020 (Event management) (Feb 2020)",
          ],
        },
      ],
      hobbySectionForm: [
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
      ],
      awardSectionForm: [
        {
          id: `awardSectionForm${1}`,
          content: ["AWARDS AND ACHIEVEMENTS"],
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
      ],
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
    this.currentSectionDisplayed = "headingSectionForm";

    this.formHead = createElement("h1", "resumeFormHeading");
    this.formHead.textContent = "Resume Generator";

    this.selectDropdownContainer = createElement("div", "selectDropdown");
    this.selectDropdown = createElement("select");
    this.selectDropdown.id = "selectDropdownId";
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

    this.headingSectionForm = createElement("div");
    this.headingSectionForm.id = "headingSectionForm";

    let headingSectionFormHead = createElement(
      "h2",
      "sectionHeading",
      "Heading Section"
    );

    this.headingSectionForm.append(
      headingSectionFormHead,
      getHeadingSectionRow("Name", "headingSecInputFieldOnLeft1", "Ravi Patel"),
      getHeadingSectionRow(
        "Collage",
        "headingSecInputFieldOnLeft2",
        "Dhirubhai Ambani Institute of Information and Communication Technology"
      ),
      getHeadingSectionRow(
        "Email",
        "headingSecInputFieldOnLeft3",
        "201801046@daiict.ac.in"
      ),
      getHeadingSectionRow(
        "DOB",
        "headingSecInputFieldOnLeft4",
        "September 29, 2000"
      ),
      getHeadingSectionRow(
        "Address",
        "headingSecInputFieldOnLeft5",
        "A-308, HoR Men, DA-IICT, Gandhinagar"
      )
    );

    this.sectionForm = createElement("form", "sectionForm");
    this.sectionForm.action = "";
    this.sectionForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    this.sectionForm.append(
      getFormSectionHeading("educationSectionForm", "Education", this),
      getFormSectionHeading("skillsSectionForm", "Skills", this),
      getFormSectionHeading("internshipSectionForm", "Internships", this),
      getFormSectionHeading("projectSectionForm", "Projects", this),
      getFormSectionHeading("awardSectionForm", "Awards & Achievements", this),
      getFormSectionHeading(
        "responsibilitySectionForm",
        "Positions Of Responsibilities",
        this
      ),
      getFormSectionHeading("hobbySectionForm", "Interests & Hobbies", this)
    );

    this.addBtnDiv = createElement("div");
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

    this[this.currentSectionDisplayed].style.display = "none";
    this[selectedValue].style.display = "block";
    this.currentSectionDisplayed = selectedValue;

    if (selectedValue !== "" && selectedValue !== "headingSectionForm")
      this.addBtnDiv.style.display = "flex";
    this.applyAndResetBtnsDiv.style.display = "flex";
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

  handleApply(handler, entries, viewHandlerToDisplayEntriesAgain) {
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
        viewHandlerToDisplayEntriesAgain(entries);
      });
    }
  }

  handleDeleteEntry(handler, entries, viewHandlerToDisplayEntriesAgain) {
    let selectedValue;
    const removeButtons = document.getElementsByClassName("entryCancelButton");
    for (let currRemoveBtn of removeButtons) {
      currRemoveBtn.addEventListener("click", (event) => {
        selectedValue = this.selectDropdown.value;
        document.getElementById(event.target.parentNode.id).remove();
        handler(selectedValue, event.target.parentNode.id);

        this.addBtn.textContent = "Add";
        emptySectionsInResumeView();
        viewHandlerToDisplayEntriesAgain(entries);
      });
    }
  }

  handleAddEntry(
    handler,
    entries,
    handlerForDelete,
    handlerForApply,
    viewHandlerToDisplayEntriesAgain
  ) {
    this.addBtn.addEventListener("click", () => {
      let selectedValue = this.selectDropdown.value;

      if (this.addBtn.textContent === "Add") {
        this.addBtn.textContent = "Confirm";
        const newIterator =
          parseInt(this[selectedValue].lastChild.id.slice(-1)) + 1;
        const newId = `${selectedValue}${newIterator}`;
        this[selectedValue].append(
          getInputFieldsForEntry(selectedValue, "", newId, this)
        );
        this.handleDeleteEntry(
          handlerForDelete,
          entries,
          viewHandlerToDisplayEntriesAgain
        );
        this.handleApply(
          handlerForApply,
          entries,
          viewHandlerToDisplayEntriesAgain
        );
      } else {
        this.addBtn.textContent = "Add";
        const newlyAddedEntryDiv = this[selectedValue].lastChild;
        const newValues = [];
        newlyAddedEntryDiv.querySelectorAll("input").forEach((field) => {
          newValues.push(field.value);
        });

        handler(selectedValue, newValues);
        this.handleReset(entries);
        emptySectionsInResumeView();
        viewHandlerToDisplayEntriesAgain(entries);
      }
    });
  }

  getFormForAllSections(entries) {
    for (let section in sectionConfig) {
      if (section === "headingSectionForm") continue;
      let sectionEntryList = entries[section];
      sectionEntryList.map((entry) => {
        if (
          (section === "educationSectionForm" ||
            section === "awardSectionForm") &&
          entry.id === `${section}1`
        ) {
        } else {
          this[section].append(
            getInputFieldsForEntry(section, entry.content, entry.id, this)
          );
        }
      });
    }
  }
}

class ResumeView {
  constructor() {
    this.resumeView = createElement("div", "resumeView");

    this.box = createElement("div", "box");
    this.resume = createElement("div", "resume");

    this.header = createElement("div", "header");
    let headerP = createElement("p");
    headerP.id = "headerDate";
    headerP.innerHTML = "7/16/2021";
    this.header.append(headerP);
    headerP = createElement("p");
    headerP.id = "headerTitle";
    headerP.innerHTML = "201801046_Resume";
    this.header.append(headerP);

    this.headerSectionInResume = createElement("div", "row");
    this.headerSectionInResume.classList.add("borderBottom1");
    let blackLineDiv = createElement("div", "blackLine");
    let remainingHeadDiv = createElement("div", "remainingHead");

    let leftDiv = createElement("div", "left");
    let leftDivImg = createElement("img");
    leftDivImg.src =
      "https://upload.wikimedia.org/wikipedia/en/b/b1/Dhirubhai_Ambani_Institute_of_Information_and_Communication_Technology_logo.png";
    leftDivImg.alt = "DAIICT LOGO";
    leftDiv.append(leftDivImg);

    let rightDiv = createElement("div", "right");

    let nameDiv = createElement("div", "bold", "Ravi Patel");
    nameDiv.classList.add("name");
    nameDiv.id = "headingSecElementOnRight1";
    let clgDiv = createElement(
      "div",
      "clg",
      "Dhirubhai Ambani Institute of Information and Communication Technology"
    );
    clgDiv.classList.add("bold");
    clgDiv.id = "headingSecElementOnRight2";

    let headParr = createElement("div", "headParr");

    let headParrChildLeft = createElement("div", "headParrChildLeft");
    let spanForBold = createElement("span", "bold", "Email");
    let aTag = createElement("a");
    aTag.href = "mailto:201801046@daiict.ac.in";
    aTag.id = "headingSecElementOnRight3";
    aTag.innerHTML = "201801046@daiict.com";
    headParrChildLeft.append(spanForBold, ": ", aTag);

    let headParrChildRight = createElement("div", "headParrChildRight");
    spanForBold = createElement("span", "bold", "DOB");
    let spanEle = createElement("span");
    spanEle.id = "headingSecElementOnRight4";
    spanEle.innerHTML = "September 29, 2000";
    headParrChildRight.append(spanForBold, ": ", spanEle);

    headParr.append(headParrChildLeft, headParrChildRight);

    let addDiv = createElement("div", "add");
    spanForBold = createElement("span", "bold", "Address");
    aTag = createElement("a");
    aTag.href = "https://goo.gl/maps/Pqpw1ik6q6NmGoHe7";
    aTag.id = "headingSecElementOnRight5";
    aTag.innerHTML = "A-308, HoR Men, DA-IICT, Gandhinagar";
    aTag.target = "_blank";
    addDiv.append(spanForBold, ": ", aTag);

    rightDiv.append(nameDiv, clgDiv, headParr, addDiv);
    remainingHeadDiv.append(leftDiv, rightDiv);
    this.headerSectionInResume.append(blackLineDiv, remainingHeadDiv);
    this.resume.append(this.header, this.headerSectionInResume);

    let rowDiv = createElement("div", "row");
    blackLineDiv = createElement("div", "blackLine");
    this.educationEntryList = createElement("div", "remaining");
    let sectionHead = createElement("div", "head1", "EDUCATION");
    this.educationEntryList.append(sectionHead);
    //Education Entry List
    rowDiv.append(blackLineDiv, this.educationEntryList);
    this.resume.append(rowDiv);

    rowDiv = createElement("div", "row");
    blackLineDiv = createElement("div", "blackLine");
    this.skillsEntryList = createElement("div", "remaining");
    sectionHead = createElement("div", "head1", "SKILLS");
    this.skillsEntryList.append(sectionHead);
    //Skills Entry List
    rowDiv.append(blackLineDiv, this.skillsEntryList);
    this.resume.append(rowDiv);

    rowDiv = createElement("div", "row");
    blackLineDiv = createElement("div", "blackLine");
    this.internshipEntryList = createElement("div", "remaining");
    sectionHead = createElement(
      "div",
      "head1",
      "PROFESSIONAL EXPERIENCE/INTERNSHIPS"
    );
    this.internshipEntryList.append(sectionHead);
    //Internship Entry List
    rowDiv.append(blackLineDiv, this.internshipEntryList);
    this.resume.append(rowDiv);

    rowDiv = createElement("div", "row");
    blackLineDiv = createElement("div", "blackLine");
    this.projectEntryList = createElement("div", "remaining");
    sectionHead = createElement("div", "head1", "PROJECTS");
    this.projectEntryList.append(sectionHead);
    //Project Entry List
    rowDiv.append(blackLineDiv, this.projectEntryList);
    this.resume.append(rowDiv);

    rowDiv = createElement("div", "row");
    blackLineDiv = createElement("div", "blackLine");
    let remainingDiv = createElement("div", "remaining");

    let vertiPart = createElement("div", "vertiPart");
    let horiPart = createElement("div", "horiPart");

    headParrChildLeft = createElement("div", "headParrChildLeft");
    let headVar1 = createElement("div", "head1");
    headVar1.classList.add("zeroMargin");
    headVar1.innerHTML = "POSITIONS OF";
    let headVar2 = createElement("div", "head1");
    headVar2.classList.add("marginBottomMinus");
    headVar2.innerHTML = "RESPONSIBILITY";
    this.responsibilityEntryList = createElement("ul", "childDetail");
    //Responsibility Entry List
    headParrChildLeft.append(headVar1, headVar2, this.responsibilityEntryList);

    headParrChildRight = createElement("div", "headParrChildRight");
    headVar1 = createElement("div", "head1");
    headVar1.classList.add("marginBottomMinus");
    headVar1.innerHTML = "INTERESTS AND HOBBIES";
    this.hobbyEntryList = createElement("ul", "childDetail");
    this.hobbyEntryList.classList.add("marginBottom");
    //Hobby Entry List
    headParrChildRight.append(headVar1, this.hobbyEntryList);

    horiPart.append(headParrChildLeft, headParrChildRight);

    this.awardEntryList = createElement(
      "div",
      "awardEntriesContainer lastSection"
    );
    //Award Entry List

    vertiPart.append(horiPart, this.awardEntryList);
    remainingDiv.append(vertiPart);

    rowDiv.append(blackLineDiv, remainingDiv);
    this.resume.append(rowDiv);

    this.box.append(this.resume);
    this.resumeView.append(this.box);

    return this;
  }

  displaySectionEntries(entries) {
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

  initialize(entries, handleDelete, handleAdd, handleEdit) {
    this.resumeView.displaySectionEntries(entries);
    this.formView.getFormForAllSections(entries);
    this.formView.handleReset(entries);
    this.formView.handleApply(
      handleEdit,
      entries,
      this.handleDisplayOfEntriesInResumeView
    );
    this.formView.handleDeleteEntry(
      handleDelete,
      entries,
      this.handleDisplayOfEntriesInResumeView
    );
    this.formView.handleAddEntry(
      handleAdd,
      entries,
      handleDelete,
      handleEdit,
      this.handleDisplayOfEntriesInResumeView
    );
  }

  handleDisplayOfEntriesInResumeView = (entries) => {
    this.resumeView.displaySectionEntries(entries);
  };
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.initialize(
      this.model.entries,
      this.handleDelete,
      this.handleAdd,
      this.handleEdit
    );
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
