# Login Actions

- To login with your credentials on the tfgrid, use the login actions
- action name: !!tfgrid.core.login
- parameters:
  - mnemonic [required]
  - network [optional]
    - a string in ['dev', 'qa', 'test', 'main']
    - if not provided, defaults to 'main'

- Example:

  ```
  !!tfgrid.core.login
      mnemonic: 'YOUR MNEMONICS'
      network: dev
  ```