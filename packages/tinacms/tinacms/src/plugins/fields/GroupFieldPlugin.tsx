import * as React from 'react'
import { Field, Form } from '@tinacms/core'
import styled, { keyframes, css } from 'styled-components'
import { FieldsBuilder } from '@tinacms/form-builder'
import { padding } from '@tinacms/styles'
import { LeftArrowIcon, RightArrowIcon } from '@tinacms/icons'
import {
  SIDEBAR_HEADER_HEIGHT,
  SIDEBAR_WIDTH,
  FORM_HEADER_HEIGHT,
  FORM_FOOTER_HEIGHT,
} from '../../Globals'

export interface GroupFieldDefinititon extends Field {
  component: 'group'
  fields: Field[]
}

export interface GroupProps {
  input: any
  meta: any
  field: GroupFieldDefinititon
  form: any
  tinaForm: Form
}

export const Group = function Group({
  tinaForm,
  form,
  field,
  input,
  meta,
}: GroupProps) {
  const [isExpanded, setExpanded] = React.useState<boolean>(false)
  return (
    <>
      <Header onClick={() => setExpanded(p => !p)}>
        {Label(field)}
        <RightArrowIcon />
      </Header>
      <Panel
        isExpanded={isExpanded}
        setExpanded={setExpanded}
        field={field}
        tinaForm={tinaForm}
      />
    </>
  )
}

interface PanelProps {
  setExpanded(next: boolean): void
  isExpanded: boolean
  tinaForm: Form
  field: GroupFieldDefinititon
  children?: any
}
const Panel = function Panel({
  setExpanded,
  isExpanded,
  tinaForm,
  field,
  children,
}: PanelProps) {
  const fields: any[] = React.useMemo(() => {
    return field.fields.map((subField: any) => ({
      ...subField,
      name: `${field.name}.${subField.name}`,
    }))
  }, [field.fields, field.name])

  return (
    <GroupPanel isExpanded={isExpanded}>
      <PanelHeader onClick={() => setExpanded(false)}>
        <LeftArrowIcon /> <span>{Label(field)}</span>
      </PanelHeader>
      <PanelBody>
        {/* {isExpanded ? <FieldsBuilder form={tinaForm} fields={fields} /> : null} */}
        <FieldsBuilder form={tinaForm} fields={fields} />
      </PanelBody>
    </GroupPanel>
  )
}

const Label = function(field: GroupFieldDefinititon) {
  return <GroupLabel>{field.label || field.name}</GroupLabel>
}

const Header = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #edecf3;
  border-radius: 0.3rem;
  margin: 0 0 1.5rem 0;
  overflow: visible;
  line-height: 1.35;
  padding: 0.75rem;
  color: #282828;
  background-color: white;

  svg {
    width: 1.5rem;
    height: auto;
    fill: #e1ddec;
    transition: all 85ms ease-out;
  }

  &:hover {
    svg {
      fill: #433e52;
    }
    color: #0084ff;
  }
`

export const PanelHeader = styled(Header)`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  flex: 0 0 auto;
  background-color: white;
  justify-content: flex-start;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #edecf3;
  margin: 0;
  padding: 0.75rem 1.25rem;

  span {
    flex: 1 1 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  svg {
    flex: 0 0 auto;
    transform: translate3d(-4px, 0, 0);
  }

  &:hover {
    svg {
      transform: translate3d(-7px, 0, 0);
    }
  }
`

export const PanelBody = styled.div`
  background: #f6f6f9;
  position: relative;
  display: flex;
  flex: 1 1 auto;
  overflow-y: auto;
`

const GroupLabel = styled.span`
  margin: 0;
  font-size: 0.85rem;
  font-weight: 500;
  color: inherit;
  transition: all 85ms ease-out;
`

const GroupPanelKeyframes = keyframes`
  0% {
    transform: translate3d( 100%, 0, 0 );
  }
  100% {
    transform: translate3d( 0, 0, 0 );
  }
`

export const GroupPanel = styled.div<{ isExpanded: boolean }>`
  position: fixed;
  width: ${SIDEBAR_WIDTH}px;
  top: ${SIDEBAR_HEADER_HEIGHT + FORM_HEADER_HEIGHT}rem;
  bottom: ${FORM_FOOTER_HEIGHT}rem;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  z-index: 50;
  pointer-events: ${p => (p.isExpanded ? 'all' : 'none')};

  > * {
    ${p =>
      p.isExpanded &&
      css`
        animation-name: ${GroupPanelKeyframes};
        animation-duration: 150ms;
        animation-delay: 0;
        animation-iteration-count: 1;
        animation-timing-function: ease-out;
        animation-fill-mode: backwards;
      `};

    ${p =>
      !p.isExpanded &&
      css`
        transition: transform 150ms ease-out;
        transform: translate3d(100%, 0, 0);
      `};
  }
`

export interface GroupFieldProps {
  field: Field
}

export function GroupField(props: GroupFieldProps) {
  return <div>Subfield: {props.field.label || props.field.name}</div>
}

export default {
  name: 'group',
  Component: Group,
}