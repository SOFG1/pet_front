import { useState } from "react";
import styled from "styled-components";
import { handle } from "../api";
import { Email } from "../api/email";
import { useToken } from "../hooks/useToken";
import { IEmail } from "../types";

const servicesOptions = [
  "Gmail",
  "Mail.ru",
  "Yahoo",
  "iCloud",
  "Yandex",
  "Mailjet",
  "Hotmail",
  "Godaddy",
];

const StyledPage = styled.div`
  padding: 0 30px;
`;

const StyledTitle = styled.h1`
  font-size: 40px;
  margin-bottom: 40px;
`;
const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 500px;
  margin-bottom: 30px;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  font: inherit;
  resize: vertical;
`;

export const EmailPage = () => {
  const token = useToken();
  const [selectedService, setSelectedService] = useState<string>("Gmail");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const sendEmail = async () => {

    const data: IEmail = {
        service: selectedService,
        user: userName,
        pass: password,
        recipient,
        subject,
        text
    }
    setIsFetching(true)
    const [res, err] = await handle(Email.sendEmail(token, data));
    setIsFetching(false)
    if(res) {
        console.log(res)
    }
    if(err) {
        console.log(err)
    }
  };

  return (
    <StyledPage>
      <StyledTitle>Send email</StyledTitle>
      <StyledColumn>
        <select
          value={selectedService}
          onChange={(s) => setSelectedService(s.target.value)}
        >
          {servicesOptions.map((s) => (
            <option value={s} key={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          type="email"
          placeholder="User name"
          autoComplete="new-password"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="email"
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <StyledTextarea
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></StyledTextarea>
        <button disabled={isFetching} onClick={sendEmail}>Send email</button>
      </StyledColumn>
    </StyledPage>
  );
};
