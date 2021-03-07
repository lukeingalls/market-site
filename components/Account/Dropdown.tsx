import { forwardRef, LegacyRef } from "react";
import { Button, Dropdown } from "react-bootstrap";
import Link from "next/link";
import { useAuth } from "../../contexts/Auth";
import * as btnStyles from "../../styles/btn-block.module.scss";
import * as styles from "../../styles/Account/Dropdown.module.scss";
import { PersonCircle } from "react-bootstrap-icons";

interface AccountCircleProps {
  onClick: (e: MouseEvent) => void;
}

const AccountCircle = forwardRef(
  ({ onClick }: AccountCircleProps, ref: LegacyRef<HTMLDivElement>) => {
    return (
      <div
        className={`${styles["account-dropdown"]} text-light d-flex align-items-center`}
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          // @ts-ignore
          onClick(e);
        }}
        role="dropdown"
        aria-label="Account Options"
      >
        <PersonCircle className={`${styles["account-dropdown--icon"]} mr-2`} />
        <span className={`${styles["account-dropdown--text"]} d-md-none`}>
          Account Details
        </span>
      </div>
    );
  }
);

export default function AccountDropdown({ className }) {
  const { currentUser, signInWithGoogle, signOut, userData } = useAuth();
  if (currentUser) {
    return (
      <Dropdown className={className}>
        <Dropdown.Toggle as={AccountCircle} />
        <Dropdown.Menu align="right" className="text-center w-sm-100">
          <Dropdown.Header>
            {userData?.displayName || currentUser?.email}
          </Dropdown.Header>
          <Dropdown.Divider />
          {userData?.author && (
            <Dropdown.Item href="/articles/my-articles">
              Manage Articles
            </Dropdown.Item>
          )}
          {/* <Dropdown.Item as={Link} to={routes.account.get()}>
            Manage Account
          </Dropdown.Item> */}
          <Dropdown.Item
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  } else {
    return (
      <Button
        className={`${className} ${btnStyles["btn-sm-block"]}`}
        onClick={signInWithGoogle}
        variant="outline-light"
      >
        Sign In
      </Button>
    );
  }
}
