function classNames(...classes: string[] | boolean[] | undefined[] | any) {
  return classes.filter(Boolean).join(" ");
}

export default classNames;
