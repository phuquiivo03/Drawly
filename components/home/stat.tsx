type Props = {
  value: string;
  unit: string;
};
function Stat(props: Props) {
  return (
    <div>
      <p className="font-display text-2xl font-bold text-ink sm:text-3xl">
        {props.value}
      </p>
      <p className="text-xs text-ink/50 sm:text-sm">{props.unit}</p>
    </div>
  );
}

export default Stat;
