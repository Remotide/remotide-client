import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Button,
  Modal,
  Label,
  Input,
  ConfirmationDialog,
  Loading,
} from "@/components";
import {
  getUser,
  useFetchContract,
  useSignContract,
  useDeleteContract,
  useInviteTalent,
} from "@/actions";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
const ContractOverview = () => {
  const { contractId } = useParams();
  const user = getUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { signContract, isSigned, isSigning } = useSignContract();
  const { deleteContract, isDeleted, isDeleting } = useDeleteContract();
  const { inviteTalent, isInviting } = useInviteTalent();
  const navigate = useNavigate();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleTalentInvitation = (e) => {
    e.preventDefault();
    // make calls to api here
    const email = e.target.elements["talentEmail"].value;
    console.log(e.target.elements["message"]);
    const description = e.target.elements["message"].value;
    if (!isInviting) {
      inviteTalent({ email, description, contractId });
    }
    closeModal();
  };

  const { data: contract, isFetching: isContractFetching } =
    useFetchContract(contractId);

  const renderButton = () => {
    if (user && contract) {
      if (user.role === "talent" && contract.status === "Unsigned") {
        return (
          <ConfirmationDialog
            label="Accept and Sign Contract"
            description={`Are you sure you want to accept and sign ${contract.name}?`}
            title="Accept and Sign"
            onConfirm={() => {
              //call to api that signs contract
              console.log(isSigning, contractId);
              if (!isSigning) {
                signContract({ contractId, navigate });
              }
            }}
          />
        );
      } else if (user.role === "company" && contract.status === "Unsigned") {
        return (
          <>
            <ConfirmationDialog
              label="Delete Contract"
              description={`Are you sure you want to delete ${contract.contract_name}?`}
              title="Delete"
              onConfirm={() => {
                //call to api that deletes contract
                if (!isDeleting) {
                  deleteContract(contractId);
                }
              }}
            />
            <Button onClick={() => openModal()}>Invite Talent</Button>
          </>
        );
      }
    }
    return null;
  };
  return (
    <>
      {isContractFetching ? (
        <Loading />
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-1 mt-6">
            <p className="text-black font-bold text-5xl text-center">
              Contract Information
            </p>
            <div className="border rounded-lg p-4">
              <h2 className="text-center text-4xl text-gray-700 font-semibold mb-2">
                Company and Job Details
              </h2>
              <div className="grid gap-4">
                <p className="font-semibold text-2xl text-black">
                  <span className="text-gray-600">Contract Type:</span>{" "}
                  {contract.contractType}
                </p>
                <p className="font-semibold text-2xl text-black">
                  <span className="text-gray-600">Contract Status:</span>{" "}
                  {contract.status}
                </p>
                <p className="font-semibold text-2xl text-black">
                  <span className="text-gray-600">Contract Name:</span>{" "}
                  {contract.contractName}
                </p>
                <p className="font-semibold text-2xl text-black">
                  <span className="text-gray-600">Registration Address:</span>{" "}
                  {contract.registrationAddress}
                </p>
                <div className="font-semibold text-2xl text-black">
                  <span className="text-gray-600">Job Responsibilities:</span>{" "}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: contract?.responsibilities,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 mt-5">
            <div className="border rounded-lg p-4">
              <h2 className="text-center text-4xl text-gray-700 font-semibold mb-2">
                Payment and Date Details
              </h2>
              <div className="grid gap-4">
                <p className="font-semibold text-2xl text-black">
                  <span className="text-gray-600">Contract Start Date:</span>{" "}
                  {contract.contractStartDate &&
                    format(parseISO(contract.contractStartDate), "yyyy-MM-dd")}
                </p>
                {contract?.contractEndDate ? (
                  <p className="font-semibold text-2xl text-black">
                    <span className="text-gray-600">Contract End Date:</span>{" "}
                    {contract.contractEndDate &&
                      format(parseISO(contract.contractEndDate), "yyyy-MM-dd")}
                  </p>
                ) : (
                  <p>This offer is for a premanent job.</p>
                )}
                <p className="font-semibold text-2xl text-black">
                  <span className="text-gray-600">Work Start Date:</span>{" "}
                  {contract.workStartDate &&
                    format(parseISO(contract.workStartDate), "yyyy-MM-dd")}
                </p>
                <p className="font-semibold text-2xl text-black">
                  <span className="text-gray-600">Payment Due:</span>{" "}
                  {contract.paymentDue} Days
                </p>
                <p className="font-semibold text-2xl text-black">
                  <span className="text-gray-600">Notice Period:</span>{" "}
                  {contract.noticePeriod.value} {contract.noticePeriod.unit}
                </p>
                <p className="font-semibold text-2xl text-black">
                  <span className="text-gray-600">Payment Currency:</span>{" "}
                  {contract.paymentCurrency}
                </p>
                {contract.contractType === "Fixed" ? (
                  <>
                    <p className="font-semibold text-2xl text-black">
                      <span className="text-gray-600">Payment Frequency:</span>{" "}
                      {contract.paymentDetail["fixed"].paymentFrequency}
                    </p>
                    <p className="font-semibold text-2xl text-black">
                      <span className="text-gray-600">Payment Rate:</span>{" "}
                      {contract.paymentDetail["fixed"].payment}{" "}
                      {contract.paymentCurrency}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-2xl text-black">
                      <span className="text-gray-600">Hourly Rate:</span>{" "}
                      {contract.paymentDetail["payAsYouGo"].hourlyRate}{" "}
                      {contract.paymentCurrency}
                    </p>
                    <p className="font-semibold text-2xl text-black">
                      <span className="text-gray-600">
                        Minimum Work Hours Before Payment:
                      </span>{" "}
                      {
                        contract.paymentDetail["payAsYouGo"]
                          .minimumHourForPayment
                      }{" "}
                      Hours
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h2 className="text-center text-4xl text-gray-700 font-semibold mb-2">
                Compliance Details
              </h2>
              <div className="grid gap-6 mt-5">
                <p className="font-semibold text-2xl text-black">
                  <span className="text-gray-600">
                    Additional Documents Link:
                  </span>
                  {contract?.additionalDocuments ? (
                    <Link
                      to={contract.additionalDocuments}
                      className="hover:underline text-blue-500 mx-4"
                    >
                      View
                    </Link>
                  ) : (
                    "No additional document has been uploaded"
                  )}
                </p>

                <p className="font-semibold text-2xl text-black">
                  <span className="text-gray-600">
                    Compliance Document Link:
                  </span>
                  {contract?.complianceDocuments ? (
                    <Link
                      to={contract.complianceDocuments}
                      className="hover:underline text-blue-500 mx-4"
                    >
                      View
                    </Link>
                  ) : (
                    "No compliiance document has been uploaded."
                  )}
                </p>
                <div className="font-semibold text-2xl text-black">
                  <span className="text-gray-600">Special Clause:</span>
                  {contract?.specialClause ? (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: contract.specialClause,
                      }}
                    />
                  ) : (
                    "No special clause has been stated."
                  )}
                </div>
              </div>
            </div>
          </div>
          {contract?.signature && (
            <div className="border rounded-lg p-4 mt-5">
              <h2 className="text-center text-4xl text-gray-700 font-semibold mb-2">
                Signatures
              </h2>
              <div className="flex flex-row justify-between">
                {contract.signature?.company && (
                  <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <p className="text-xl font-bold mb-2">Company</p>
                    <div className="text-lg font-semibold">
                      {contract.signature?.company?.name}
                    </div>
                    <div className="text-gray-500">
                      {contract.signature?.company?.date &&
                        format(
                          parseISO(contract.signature?.company?.date),
                          "yyyy-MM-dd"
                        )}
                    </div>
                    <div className="mt-2">
                      <div className="text-lg font-semibold">
                        {contract.signature?.company?.location}
                      </div>
                    </div>
                  </div>
                )}
                {contract.signature?.talent && (
                  <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <p className="text-xl font-bold mb-2">Talent</p>
                    <div className="text-lg font-semibold">
                      {contract.signature?.talent?.name}
                    </div>
                    <div className="text-gray-500">
                      {contract.signature?.talent?.date &&
                        format(
                          parseISO(contract.signature?.talent?.date),
                          "yyyy-MM-dd"
                        )}
                    </div>
                    <div className="mt-2">
                      <div className="text-lg font-semibold">
                        {contract.signature?.talent?.location}{" "}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="text-center mt-8 space-x-5">
            {renderButton()}
            <Button background="bg-green-500 hover:bg-green-700">
              Download Contract as PDF
            </Button>
          </div>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <form onSubmit={handleTalentInvitation}>
              <div>
                <Label htmlFor="talentEmail">Talent Email</Label>
                <Input
                  id="talentEmail"
                  name="talentEmail"
                  placeholder="Enter the email of the talent"
                  type="email"
                  required={true}
                  size="w-full"
                ></Input>
              </div>
              <div>
                <Label htmlFor="message">Invitation Message</Label>
                <Input
                  id="message"
                  name="message"
                  placeholder="Enter the invitation message for the talent"
                  type="text"
                  size="w-full"
                />
              </div>
              <div className="mt-6">
                <span className="flex flex-grow items-center justify-center w-full rounded-md shadow-sm">
                  <Button size="w-full" type="submit">
                    Send Invitation
                  </Button>
                </span>
              </div>
            </form>
          </Modal>
        </>
      )}
    </>
  );
};

export default ContractOverview;
