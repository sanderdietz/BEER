import DeclarationForm from "../components/DeclarationForm";
import Logout from "../components/Logout";
import PluizenTable from "../components/PluizenTable";

export default function Pluis() {
  return (
    <>
      <h1>Pluizen</h1>
      <PluizenTable account_type="lid"/>
      <h1>Meelopers</h1>
      <PluizenTable account_type="meeloper"/>
      <h1>Oud-pluizen</h1>
      <PluizenTable account_type="oud_lid"/>
      <DeclarationForm />
      <Logout />
    </>
  );
}
