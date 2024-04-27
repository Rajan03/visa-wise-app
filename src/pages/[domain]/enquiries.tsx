import {
  AssignToTag,
  EnquiryMenu,
  EnquiryStatusTag,
} from "@/components/domain";
import { Badge, Button, Collapse, Table } from "@/components/ui";
import { Icons } from "@/config";
import { DashboardLayout, DomainLayout } from "@/layouts";
import { EnquiryStatus, IEnquiry } from "@/types";

const header = [
  "Name",
  "From",
  "To",
  "Visa Type",
  "Enquiry Status",
  "Enquiry Source",
  "Created Date",
  "Assigned To",
  "",
];
const enquiries: IEnquiry[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    dob: "1990-05-15",
    gender: "Male",
    country: "United States",
    nationality: "American",
    address: "123 Main St",
    migrateToCountry: "Canada",
    visaType: "Work Permit",
    message: "Seeking better job opportunities",
    status: EnquiryStatus.PENDING,
    source: "Referral",
    citizenship: "American",
    currentVisaType: "Tourist Visa",
    currentVisaExpiry: "2024-06-30",
    education: [
      {
        degree: "Bachelor's",
        major: "Computer Science",
        institution: "University of XYZ",
        year: "2012",
      },
    ],
    workExperience: [
      {
        jobTitle: "Software Engineer",
        company: "ABC Inc.",
        start: "2013-01-01",
        end: "2023-12-31",
        isCurrent: false,
      },
      {
        jobTitle: "Senior Software Engineer",
        company: "XYZ Corp.",
        start: "2024-01-01",
        isCurrent: true,
      },
    ],
    englishProficiency: [
      {
        test: "IELTS",
        score: "7.5",
        date: "2023-05-20",
        scoreDivision: {
          listening: "7.5",
          reading: "7.5",
          writing: "7.0",
          speaking: "8.0",
        },
        isResultAvailable: true,
      },
    ],
    createdAt: "2024-04-27T12:00:00Z",
    updatedAt: "2024-04-27T12:00:00Z",
  },
  {
    id: "2",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
    dob: "1985-08-20",
    gender: "Female",
    country: "Canada",
    nationality: "Canadian",
    address: "456 Maple Ave",
    migrateToCountry: "Australia",
    migrateToCity: "Sydney",
    visaType: "Skilled Independent Visa",
    message: "Seeking permanent residency",
    status: EnquiryStatus.APPROVED,
    assignedTo: "John Doe",
    source: "Online Application",
    citizenship: "Canadian",
    currentVisaType: "Work Permit",
    currentVisaExpiry: "2024-09-30",
    education: [
      {
        degree: "Master's",
        major: "Business Administration",
        institution: "University of ABC",
        year: "2010",
      },
    ],
    workExperience: [
      {
        jobTitle: "Marketing Manager",
        company: "XYZ Marketing Agency",
        start: "2011-01-01",
        end: "2023-12-31",
        isCurrent: false,
      },
      {
        jobTitle: "Senior Marketing Manager",
        company: "ABC Solutions",
        start: "2024-01-01",
        isCurrent: true,
      },
    ],
    englishProficiency: [
      {
        test: "TOEFL",
        score: "110",
        date: "2023-09-15",
        isResultAvailable: true,
      },
    ],
    createdAt: "2024-04-27T12:00:00Z",
    updatedAt: "2024-04-27T12:00:00Z",
  },
  {
    id: "3",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
    dob: "1985-08-20",
    gender: "Female",
    country: "Canada",
    nationality: "Canadian",
    address: "456 Maple Ave",
    migrateToCountry: "Australia",
    migrateToCity: "Sydney",
    visaType: "Skilled Independent Visa",
    message: "Seeking permanent residency",
    status: EnquiryStatus.IN_PROGRESS,
    source: "Online Application",
    citizenship: "Canadian",
    currentVisaType: "Work Permit",
    currentVisaExpiry: "2024-09-30",
    assignedTo: "John Doe",
    education: [
      {
        degree: "Master's",
        major: "Business Administration",
        institution: "University of ABC",
        year: "2010",
      },
    ],
    workExperience: [
      {
        jobTitle: "Marketing Manager",
        company: "XYZ Marketing Agency",
        start: "2011-01-01",
        end: "2023-12-31",
        isCurrent: false,
      },
      {
        jobTitle: "Senior Marketing Manager",
        company: "ABC Solutions",
        start: "2024-01-01",
        isCurrent: true,
      },
    ],
    englishProficiency: [
      {
        test: "TOEFL",
        score: "110",
        date: "2023-09-15",
        isResultAvailable: true,
      },
    ],
    createdAt: "2024-04-27T12:00:00Z",
    updatedAt: "2024-04-27T12:00:00Z",
  },
];

export default function Enquiries() {
  return (
    <DomainLayout>
      <DashboardLayout>
        <div className="container mx-auto mt-4">
          {/* Header */}
          <PageHeader />

          {/* Table */}
          <div className="mt-4">
            <Table.Root className="w-full">
              <TableHeader />

              <Table.Body>
                {enquiries.map((enquiry) => (
                  <CollapseRow key={enquiry.id} {...enquiry} />
                ))}
              </Table.Body>
            </Table.Root>
          </div>
        </div>
      </DashboardLayout>
    </DomainLayout>
  );
}

// Page Header
function PageHeader() {
  return (
    <div className="flex justify-start items-center gap-2">
      <h1 className="text-md font-bold text-foreground">
        Assessment Enquiries
      </h1>
      <Button variant={"ghost"}>
        <Icons.Add className="w-5 h-5 text-primary" strokeWidth={"1.5px"} />
      </Button>
    </div>
  );
}

// Table Header
function TableHeader() {
  return (
    <>
      <Table.Header className="w-full bg-primary/5">
        <Table.Row>
          {header.map((item, index) => (
            <Table.Head key={index} className="min-w-16">
              {item}
            </Table.Head>
          ))}
        </Table.Row>
      </Table.Header>
    </>
  );
}

// Table Row Collpasible
function CollapseRow(enquiry: IEnquiry) {
  return (
    <Collapse.Root asChild>
      <>
        <Collapse.Trigger asChild>
          <Table.Row>
            <Table.Cell className="min-w-16">
              <p className="text-md font-medium text-foreground">
                {enquiry.firstName} {enquiry.lastName}
              </p>
            </Table.Cell>
            <Table.Cell className="min-w-16">{enquiry.country}</Table.Cell>
            <Table.Cell className="min-w-16">
              {enquiry.migrateToCountry}
            </Table.Cell>
            <Table.Cell className="min-w-16">{enquiry.visaType}</Table.Cell>
            <Table.Cell className="min-w-16">
              <EnquiryStatusTag status={enquiry.status} />
            </Table.Cell>
            <Table.Cell className="min-w-16">{enquiry.source}</Table.Cell>
            <Table.Cell className="min-w-16">{enquiry.createdAt}</Table.Cell>
            <Table.Cell className="min-w-16">
              <AssignToTag assignedTo={enquiry.assignedTo} />
            </Table.Cell>
            <Table.Cell>
              <EnquiryMenu id={enquiry.id}>
                <Button variant="ghost" key={enquiry.id}>
                  <Icons.More
                    className="w-4 h-4 text-primary"
                    strokeWidth={"1.5px"}
                  />
                </Button>
              </EnquiryMenu>
            </Table.Cell>
          </Table.Row>
        </Collapse.Trigger>

        <Collapse.Content asChild>
          <Table.Row>
            <Table.Cell colSpan={9} className="relative">
              <div className="py-1">
                {/* User Details */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-0.5">
                    <h1 className="text-md font-bold text-foreground">
                      {enquiry.firstName} {enquiry.lastName}
                    </h1>
                    <p className="text-xs text-gray-500">
                      {enquiry.email}{" "}
                      {enquiry.phone ? `| ${enquiry.phone}` : ""}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <p className="text-xs text-gray-500">Team Member: </p>
                    <AssignToTag assignedTo={enquiry.assignedTo} />
                  </div>
                </div>

                {/* Visa Application details */}
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <CollapseChild
                    title="Travel From"
                    value={
                      <Badge variant={"secondary"}>{enquiry.country}</Badge>
                    }
                  />
                  <CollapseChild title="Visa Type" value={enquiry.visaType} />
                  <CollapseChild
                    title="Enquiry Source"
                    value={enquiry.source}
                  />
                  <CollapseChild
                    title="Travel To"
                    value={
                      <Badge variant={"secondary"}>
                        {enquiry.migrateToCountry}
                      </Badge>
                    }
                  />
                  <CollapseChild
                    title="Enquiry Status"
                    value={<EnquiryStatusTag status={enquiry.status} />}
                  />
                  <CollapseChild
                    title="Created Date"
                    value={enquiry.createdAt}
                  />
                </div>

                {/* Enqiry */}
                <div className="mt-2 text-xs relative min-h-12">
                  <p className="absolute bottom-0 line-clamp-3">
                    {enquiry.message}
                  </p>
                </div>
              </div>
            </Table.Cell>
          </Table.Row>
        </Collapse.Content>
      </>
    </Collapse.Root>
  );
}

// Content of Collapse component
function CollapseChild({
  title,
  value,
}: {
  title: string;
  value: string | JSX.Element;
}) {
  return (
    <div className="grid grid-cols-[6rem,1fr] gap-3 items-center">
      <p className="text-xs text-nowrap truncate">{title}</p>
      <div>
        {typeof value === "string" ? (
          <Badge variant={"secondary"} className="text-nowrap truncate">
            {value}
          </Badge>
        ) : (
          value
        )}
      </div>
    </div>
  );
}
