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
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";

const TopHeader = ({ name }) => {
  return (
    <h2 className="text-center text-4xl text-gray-700 font-semibold mb-2">
      {name}
    </h2>
  );
};

const TextCard = ({ name, children }) => {
  return (
    <p className="font-semibold text-2xl text-black">
      {children} {name}
    </p>
  );
};

const SignatureCard = ({ UserType, name, date, location }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <p className="text-2xl font-bold mb-2 text-center">{UserType}</p>
      <div className="text-lg font-semibold">{name}</div>
      <div className="text-gray-500">{date}</div>
      <div className="mt-2">
        <div className="text-lg font-semibold">{location}</div>
      </div>
    </div>
  );
};

const TextCardTitle = ({ name }) => {
  return <span className="text-gray-600">{name}</span>;
};

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
  const handlePrint = useReactToPrint({
    content: () => document.getElementById("contractContent"),
  });
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
          <div id="contractContent">
            {/* Basic Contract Information Company and Job Details
              Contract Type,Status,Name,Registration Address,Job Responsibilities
             */}
            <div className="grid gap-6 md:grid-cols-1 mt-6">
              <p className="text-black font-bold text-5xl text-center">
                Contract Information
              </p>
              <div className="border rounded-lg p-4">
                <TopHeader name="Company and Job Details" />
                <div className="grid gap-4">
                  <TextCard name={contract.contractType}>
                    <TextCardTitle name="Contract Type:" />
                  </TextCard>
                  <TextCard name={contract.status}>
                    <TextCardTitle name="Contract Status" />
                  </TextCard>
                  <TextCard name={contract.contractName}>
                    <TextCardTitle name="Contract Name:" />
                  </TextCard>
                  <TextCard name={contract.registrationAddress}>
                    <TextCardTitle name="Registration Address:" />
                  </TextCard>
                  <div className="text-2xl text-black">
                    <TextCardTitle name="Job Responsibilities:" />
                    <article
                      dangerouslySetInnerHTML={{
                        __html: contract?.responsibilities,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment and Date Details */}
            <div className="grid gap-6 md:grid-cols-2 mt-5">
              <div className="border rounded-lg p-4">
                <TopHeader name="Payment and Date Details" />
                <div className="grid gap-4">
                  <TextCard
                    name={
                      contract.contractStartDate &&
                      format(
                        parseISO(contract.contractStartDate),
                        "dd MMMM, yyyy h:mm a"
                      )
                    }
                  >
                    <TextCardTitle name="Contract Start Date:" />
                  </TextCard>
                  {contract?.contractEndDate ? (
                    <TextCard
                      name={
                        contract.contractEndDate &&
                        format(
                          parseISO(contract.contractEndDate),
                          "dd MMMM, yyyy h:mm a"
                        )
                      }
                    >
                      <TextCardTitle name="Contract End Date:" />
                    </TextCard>
                  ) : (
                    <p>This offer is for a premanent job.</p>
                  )}
                  <TextCard
                    name={
                      contract.workStartDate &&
                      format(
                        parseISO(contract.workStartDate),
                        "dd MMMM, yyyy h:mm a"
                      )
                    }
                  >
                    <TextCardTitle name="Work Start Date:" />
                  </TextCard>
                  <TextCard name={contract.paymentDue + " Days"}>
                    <TextCardTitle name="Payment Due:" />
                  </TextCard>
                  <TextCard
                    name={
                      contract.noticePeriod.value +
                      " " +
                      contract.noticePeriod.unit
                    }
                  >
                    <TextCardTitle name="Notice Period:" />
                  </TextCard>
                  <TextCard name={contract.paymentCurrency}>
                    <TextCardTitle name="Payment Currency:" />
                  </TextCard>
                  {contract.contractType === "Fixed" ? (
                    <>
                      <TextCard
                        name={contract.paymentDetail["fixed"].paymentFrequency}
                      >
                        <TextCardTitle name="Payment Frequency:" />
                      </TextCard>
                      <TextCard
                        name={
                          contract.paymentDetail["fixed"].payment +
                          " " +
                          contract.paymentCurrency
                        }
                      >
                        <TextCardTitle name="Payment Rate:" />
                      </TextCard>
                    </>
                  ) : (
                    <>
                      <TextCard
                        name={
                          contract.paymentDetail["payAsYouGo"].hourlyRate +
                          " " +
                          contract.paymentCurrency
                        }
                      >
                        <TextCardTitle name="Hourly Rate:" />
                      </TextCard>
                      <TextCard
                        name={
                          contract.paymentDetail["payAsYouGo"]
                            .minimumHourForPayment +
                          " " +
                          "Hours"
                        }
                      >
                        <TextCardTitle name="Minimum Work Hours Before Payment:" />
                      </TextCard>
                    </>
                  )}
                </div>
              </div>

              {/* Compliance Details */}
              <div className="border rounded-lg p-4">
                <TopHeader name="Compliance Details" />
                <div className="grid gap-6 mt-5">
                  <TextCard>
                    <TextCardTitle name="Additional Documents Link:" />

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
                  </TextCard>

                  <TextCard>
                    <TextCardTitle name="Compliance Document Link:" />
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
                  </TextCard>
                  <div className="text-2xl text-black">
                    <TextCardTitle name="Special Clause:" />
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

            {/* Contract Signature */}
            {contract?.signature && (
              <div className="border rounded-lg p-4 mt-5">
                <TopHeader name="Signatures" />
                <div className="flex flex-row justify-between">
                  {contract.signature?.company && (
                    <SignatureCard
                      UserType={"Company"}
                      name={contract.signature?.company?.name}
                      date={
                        contract.signature?.company?.date &&
                        format(
                          parseISO(contract.signature?.company?.date),
                          "dd MMMM, yyyy h:mm a"
                        )
                      }
                      location={contract.signature?.company?.location}
                    />
                  )}
                  {contract.signature?.talent && (
                    <SignatureCard
                      UserType={"Talent"}
                      name={contract.signature?.talent?.name}
                      date={
                        contract.signature?.talent?.date &&
                        format(
                          parseISO(contract.signature?.talent?.date),
                          "dd MMMM, yyyy h:mm a"
                        )
                      }
                      location={contract.signature?.talent?.location}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="text-center mt-8 space-x-5">
            {renderButton()}
            <Button
              background="bg-green-500 hover:bg-green-700"
              onClick={handlePrint}
            >
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
