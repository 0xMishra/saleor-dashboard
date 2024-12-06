import { createSvgIcon, SvgIconProps } from "@material-ui/core";

const StaffMembersIcon = createSvgIcon(
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M10 4C10 2.89543 10.8954 2 12 2H14C15.1046 2 16 2.89543 16 4V5.5H19C20.6569 5.5 22 6.84315 22 8.5V27C22 28.6569 20.6569 30 19 30H7C5.34315 30 4 28.6569 4 27V8.5C4 6.84315 5.34315 5.5 7 5.5H10V4ZM10 7.5H7C6.44772 7.5 6 7.94772 6 8.5V27C6 27.5523 6.44772 28 7 28H19C19.5523 28 20 27.5523 20 27V8.5C20 7.94772 19.5523 7.5 19 7.5H16V7.57143C16 8.676 15.1046 9.57143 14 9.57143H12C10.8954 9.57143 10 8.676 10 7.57143V7.5ZM14 4H12V7.57143L14 7.57143V4ZM8.5835 18.4762C8.5835 16.5563 10.1398 15 12.0597 15H14.4406C16.3605 15 17.9168 16.5563 17.9168 18.4762C17.9168 19.7123 16.9148 20.7143 15.6787 20.7143H10.8216C9.58553 20.7143 8.5835 19.7123 8.5835 18.4762ZM12.0597 17C11.2444 17 10.5835 17.6609 10.5835 18.4762C10.5835 18.6077 10.6901 18.7143 10.8216 18.7143H15.6787C15.8102 18.7143 15.9168 18.6077 15.9168 18.4762C15.9168 17.6609 15.2559 17 14.4406 17H12.0597ZM8.66675 21.5C8.11446 21.5 7.66675 21.9477 7.66675 22.5C7.66675 23.0523 8.11446 23.5 8.66675 23.5H17.8334C18.3857 23.5 18.8334 23.0523 18.8334 22.5C18.8334 21.9477 18.3857 21.5 17.8334 21.5H8.66675ZM7.66675 25.2858C7.66675 24.7335 8.11446 24.2858 8.66675 24.2858H11.4167C11.969 24.2858 12.4167 24.7335 12.4167 25.2858C12.4167 25.8381 11.969 26.2858 11.4167 26.2858H8.66675C8.11446 26.2858 7.66675 25.8381 7.66675 25.2858ZM16.0002 24.2858C15.448 24.2858 15.0002 24.7335 15.0002 25.2858C15.0002 25.8381 15.448 26.2858 16.0002 26.2858H17.8336C18.3859 26.2858 18.8336 25.8381 18.8336 25.2858C18.8336 24.7335 18.3859 24.2858 17.8336 24.2858H16.0002ZM15.0834 12.2857C15.0834 13.3114 14.2626 14.1429 13.2501 14.1429C12.2376 14.1429 11.4167 13.3114 11.4167 12.2857C11.4167 11.2601 12.2376 10.4286 13.2501 10.4286C14.2626 10.4286 15.0834 11.2601 15.0834 12.2857ZM21 2C20.4477 2 20 2.44772 20 3C20 3.55228 20.4477 4 21 4H25C25.5523 4 26 4.44772 26 5V25C26 25.5523 25.5523 26 25 26H24.4285C23.8763 26 23.4285 26.4477 23.4285 27C23.4285 27.5523 23.8763 28 24.4285 28H25C26.6569 28 28 26.6569 28 25V5C28 3.34314 26.6569 2 25 2H21Z"
    fill="currentColor"
  />,
  "StaffMembers",
);

export default function StaffMembers(props: SvgIconProps) {
  return <StaffMembersIcon {...props} viewBox="0 0 32 32" />;
}
